import { DateTime } from '@syncfusion/ej2/charts';
import { Gender } from '../Enums/gender';

export class User {
  userRole!: string;
  userStatus!: string;
  isEmailVerified!: boolean;
  filePath!: string;
  module!: number;
  createdOn!: DateTime;
  id!: string;
  fullName!: string;
  username!: string;
  email!: string;
  phoneNumber!: string;
  gender: string = '';
}

export class Engineer {
  categoryId!: string;
  description!: string;
  email!: string;
  engineerId!: string;
  fullName!: string;
  gender!: string;
  jobRole!: string;
  managerId!: string;
  managerName!: string;
  phoneNumber!: string;
}

export class userResponse{
  
createdOn!:string;
email!:string; 
filePath!:string;
fullName!:string;
gender!:string;
id!:string;
isEmailVerified!:boolean;
module!:number;
phoneNumber!:string;
userRole!:"";
userStatus!:string;
username!:string;
}

