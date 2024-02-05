export class ProductSolutionResponse {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public charges?: number,
    public freeServiceDistance?: number,
    public perKilometerCharge?: number,
    public isAvailable?: boolean,
    public brandId: string = ''
  ) {}
}
