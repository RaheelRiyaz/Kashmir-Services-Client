export class TestimonialResponse{
  id!: string;
  userId!: string;
  fullName!: string;
  description!: string;
  isActive!: boolean;
  quantity!: number;
  createdOn!: string;
  filePath!: string;
}

export  class UpdateTestimonialStatusRequest
{
  id!: string;
  status!: boolean;
}
