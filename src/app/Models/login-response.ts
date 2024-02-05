import { UserRole } from "../Enums/user-role";

export class LoginResponse{
    constructor(
        public fullName:string="",
        public userRole: UserRole,
        public token:string=""
    ) {}
}