import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';

import { Door } from '../models';
import { DoorService } from '../door.service';
import { DoorAccessService } from '../door-access.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-door-details',
  templateUrl: './door-details.component.html',
  styleUrls: ['./door-details.component.css'],
})
export class DoorDetailsComponent implements OnInit {
  public form!: FormGroup;
  public doorId: string | null = null;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doorService: DoorService,
    private doorAccessService: DoorAccessService,
    private personService: PersonService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.doorId = this.route.snapshot.paramMap.get('doorId');
    const door = this.doorId && this.doorService.getById(this.doorId);
    if (door) {
      this.buildForm(door);
      this.doorId = door.id;
    } else {
      this.doorId = null;
    }
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.doorId) {
      this.doorService.patchOne(this.doorId, {
        number: this.form.value.number,
      });
      this.snackBar.open('Door has been successfully updated');
    } else {
      const newDoorId = uuid();
      this.doorService.addOne({
        id: newDoorId,
        number: this.form.value.number,
      });
      this.personService.listAll().forEach((person) => {
        this.doorAccessService.addOne({
          id: uuid(),
          personId: person.id,
          doorId: newDoorId,
          hasAccess: false,
        });
      });

      this.snackBar.open('Door has been successfully added');
    }
    this.router.navigateByUrl('/doors').then();
  }

  private buildForm(door?: Door): void {
    this.form = this.fb.group({
      number: [door?.number ?? '', Validators.required],
    });
  }
}
