/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
export enum ContactType {
  PERSONAL = "PERSONAL",
  CLIENT = "CLIENT",
  SUPPLIER = "SUPPLIER",
  EMPLOYEE = "EMPLOYEE",
  EMPLOYER = "EMPLOYER",
  SERVICE = "SERVICE"
}

export class Contact {
  constructor(
    public uuid: string,
    public name: string,
    public type: ContactType,
    public phone: string,
    public iconUuid: string,
  ) {
  }
}
