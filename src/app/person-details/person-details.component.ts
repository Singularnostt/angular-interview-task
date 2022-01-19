import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';

import { Door, DoorAccess, Person } from '../models';
import { PersonService } from '../person.service';
import { DoorService } from '../door.service';
import { DoorAccessService } from '../door-access.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent implements OnInit {
  public form!: FormGroup;
  public personId: string | null = null;
  public doorAccesses: DoorAccess[] = [];
  public displayedColumns: string[] = ['DoorNumber', 'Access'];

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private doorService: DoorService,
    private doorAccessService: DoorAccessService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('personId');
    const person = this.personId && this.personService.getById(this.personId);
    if (person) {
      this.doorAccesses = this.doorAccessService.getlistById(person.id);
      this.buildForm(person);
      this.personId = person.id;
    } else {
      this.personId = null;
    }
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.personId) {
      this.personService.patchOne(this.personId, {
        fullName: this.form.value.fullName,
      });
      this.doorAccessService.patchEachOne(this.doorAccesses);
      this.snackBar.open('Person has been successfully updated');
    } else {
      const newPersonId = uuid();
      this.personService.addOne({
        id: newPersonId,
        fullName: this.form.value.fullName,
      });
      this.doorAccessService.assignDoorAccessList(newPersonId);
      this.snackBar.open('Person has been successfully added');
    }
    this.router.navigateByUrl('/persons').then();
  }

  public getDoorNumberById(doorId: string): number | undefined {
    return this.doorService.getById(doorId)?.number;
  }

  public toogleDoorAccess(doorAccess: DoorAccess) {
    const elemIndex = this.doorAccesses.indexOf(doorAccess);
    this.doorAccesses[elemIndex].hasAccess =
      !this.doorAccesses[elemIndex].hasAccess;
  }

  private buildForm(person?: Person): void {
    this.form = this.fb.group({
      fullName: [person?.fullName ?? '', Validators.required],
    });
  }
}
