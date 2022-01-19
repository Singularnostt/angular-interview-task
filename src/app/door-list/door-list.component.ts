import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DoorService } from '../door.service';
import { DoorAccessService } from '../door-access.service';
import { Door } from '../models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-door-list',
  templateUrl: './door-list.component.html',
  styleUrls: ['./door-list.component.css'],
})
export class DoorListComponent implements OnInit {
  public displayedColumns: string[] = ['number', 'actions'];
  public doors!: MatTableDataSource<Door>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(
    private doorService: DoorService,
    private doorAccessService: DoorAccessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.doors = new MatTableDataSource<Door>(this.doorService.listAll());
  }

  public ngAfterViewInit() {
    this.doors.paginator = this.paginator;
  }

  public deleteDoor(doorId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to proceed?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const door = this.doorService.deleteOne(doorId)!;
        this.doorAccessService.deleteDoorRelations(doorId);
        this.doors = new MatTableDataSource<Door>(this.doorService.listAll());
        this.snackBar.open(`${door.number} has been removed`);
      }
    });
  }
}
