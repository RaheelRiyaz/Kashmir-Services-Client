export class CategoryRequest {
  constructor(
    public name?: string,
    public description?: string,
    public file?: string,
    public managerId: string = ''
  ) {}
}

export class CategoryUpdateRequest {
  constructor(
    public id: string = '',
    public name?: string,
    public description?: string,
    public file?: string,
    public managerId?: string
  ) {}
}

export class CategoryResponse {
  constructor(
    public id?: string,
    public name?: string,
    public filePath?: string,
    public description?: string,
    public managerName?: string
  ) {}
}
