/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
export class CurrencyDto {
  constructor(
    public uuid: string,
    public symbol: string,
    public description: string
  ) {
  }
}
