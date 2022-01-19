export interface Person {
  id: string;
  fullName: string;
}

export interface Door {
  id: string;
  number: number;
}

export interface DoorAccess {
  id: string;
  personId: string;
  doorId: string;
  hasAccess: boolean;
}
