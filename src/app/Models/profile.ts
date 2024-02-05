import { Gender } from "../Enums/gender";

export class ProfileUpdateRequest{
    Id!:string;
    FullName!:string;
    Email!:string;
    PhoneNumber!:string;
    Gender!:Gender;
    File!:string;
}
export class ProfileUpdateResponse{
    userRole!:string;
    userStatus!: string;
    isEmailVerified!:boolean;
    filePath!:string;
    module!: number;
    createdOn!: string;
    id!:string;
    fullName!:string;
    username!: string;
    email!: string;
    phoneNumber!: string;
    gender!: string;
}