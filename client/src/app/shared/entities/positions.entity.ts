import { Item } from "../interfaces/common.interface";

export namespace Positions {
  export class PositionByCategory extends Item {
    constructor(name: string, public cost: number,  _id: string, public quantity: number, public category?: string, public user?: string, public total?: number) {
      super(name, _id)
    }
  }
}
