export class AddBrand {
  constructor(
    public name?: string,
    public description?: string,
    public categoryId: string = ''
  ) {}
}
