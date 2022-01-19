import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Door } from './models';

@Injectable({
  providedIn: 'root',
})
export class DoorService {
  private ids: string[] = [];
  private doors: { [doorId: string]: Door } = {};

  public constructor() {
    this.addOne({
      id: uuid(),
      number: 111,
    });

    this.addOne({
      id: uuid(),
      number: 222,
    });

    this.addOne({
      id: uuid(),
      number: 333,
    });

    this.addOne({
      id: uuid(),
      number: 444,
    });
  }

  public listAll(): Door[] {
    return this.ids.map((id) => this.doors[id]);
  }

  public getById(doorId: string): Door | null {
    return this.doors[doorId] ?? null;
  }

  public addOne(door: Door): Door {
    this.doors = { ...this.doors };
    this.doors[door.id] = door;
    this.ids = this.ids.filter((id) => id !== door.id);
    this.ids.push(door.id);
    return door;
  }

  public deleteOne(doorId: string): Door | null {
    let door: Door | null = this.doors[doorId] ?? null;
    if (door) {
      this.ids = this.ids.filter((id) => id !== doorId);
      delete this.doors[doorId];
    }

    return door;
  }

  public patchOne(doorId: string, changes: Partial<Door>): Door | null {
    let door: Door | null = this.doors[doorId] ?? null;
    if (door) {
      door = { ...door, ...changes, id: doorId };
      this.doors[doorId] = door;
    }
    return door;
  }
}
