import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PersonService } from '../person.service';
import { Person } from '../models';
import { DoorAccessService } from '../door-access.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['fullName', 'actions'];
  public persons!: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(
    private personService: PersonService,
    private doorAccessService: DoorAccessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.persons = new MatTableDataSource<Person>(this.personService.listAll());
  }

  public ngAfterViewInit(): void {
    this.persons.paginator = this.paginator;
  }

  public deletePerson(personId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to proceed?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const person = this.personService.deleteOne(personId)!;
        this.doorAccessService.deleteDoorRelations(personId);
        this.persons = new MatTableDataSource<Person>(
          this.personService.listAll()
        );
        this.snackBar.open(`${person.fullName} has been removed`);
      }
    });
  }
}
