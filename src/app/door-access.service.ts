import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { DoorService } from './door.service';
import { PersonService } from './person.service';
import { Door, Person, DoorAccess } from './models';

@Injectable({
  providedIn: 'root',
})
export class DoorAccessService {
  private ids: string[] = [];
  private doorAccesses: { [doorAccessId: string]: DoorAccess } = {};

  public constructor(
    private personService: PersonService,
    private doorService: DoorService
  ) {
    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[0].id,
      doorId: this.doorService.listAll()[0].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[1].id,
      doorId: this.doorService.listAll()[0].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[2].id,
      doorId: this.doorService.listAll()[0].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[3].id,
      doorId: this.doorService.listAll()[0].id,
      hasAccess: false,
    });
    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[0].id,
      doorId: this.doorService.listAll()[1].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[1].id,
      doorId: this.doorService.listAll()[1].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[2].id,
      doorId: this.doorService.listAll()[1].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[3].id,
      doorId: this.doorService.listAll()[1].id,
      hasAccess: false,
    });
    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[0].id,
      doorId: this.doorService.listAll()[2].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[1].id,
      doorId: this.doorService.listAll()[2].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[2].id,
      doorId: this.doorService.listAll()[2].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[3].id,
      doorId: this.doorService.listAll()[2].id,
      hasAccess: false,
    });
    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[0].id,
      doorId: this.doorService.listAll()[3].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[1].id,
      doorId: this.doorService.listAll()[3].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[2].id,
      doorId: this.doorService.listAll()[3].id,
      hasAccess: false,
    });

    this.addOne({
      id: uuid(),
      personId: this.personService.listAll()[3].id,
      doorId: this.doorService.listAll()[3].id,
      hasAccess: false,
    });
  }

  public listAll(): DoorAccess[] {
    return this.ids.map((id) => this.doorAccesses[id]);
  }

  public getlistById(personId: string): DoorAccess[] {
    return this.ids
      .map((id) => this.doorAccesses[id])
      .filter((doorAccess) => doorAccess.personId === personId);
  }

  public getById(id: string): DoorAccess | null {
    return this.doorAccesses[id] ?? null;
  }

  public assignDoorAccessList(personId: string): void {
    this.doorService.listAll().forEach((doorId) => {
      this.addOne({
        id: uuid(),
        personId: personId,
        doorId: doorId.id,
        hasAccess: false,
      });
    });
  }

  public addOne(doorAccess: DoorAccess): DoorAccess {
    this.doorAccesses = { ...this.doorAccesses };
    this.doorAccesses[doorAccess.id] = doorAccess;
    this.ids = this.ids.filter((id) => id !== doorAccess.id);
    this.ids.push(doorAccess.id);
    return doorAccess;
  }

  public patchEachOne(changes: DoorAccess[]): void {
    changes.forEach((doorAccess) => {
      this.doorAccesses[doorAccess.id] = doorAccess;
    });
  }

  public deleteDoorRelations(doorId: string): void {
    const newIds: string[] = [];

    this.listAll().forEach((doorAccess) => {
      if (doorAccess.doorId !== doorId) {
        newIds.push(doorAccess.id);
      } else {
        delete this.doorAccesses[doorAccess.id];
      }
    });

    this.ids = newIds;
  }

  public deletePersonRelations(personId: string): void {
    const newIds: string[] = [];

    this.listAll().forEach((doorAccess) => {
      if (doorAccess.personId !== personId) {
        newIds.push(doorAccess.id);
      } else {
        delete this.doorAccesses[doorAccess.id];
      }
    });

    this.ids = newIds;
  }
}
