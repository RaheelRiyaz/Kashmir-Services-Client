export class Signup {
    constructor(
        public fullName?:string,
        public userName?:string,
        public email?:string,
        public phoneNumber?:string,
        public gender:number=0,
        public password?:string,
        public confirmPassword?:string,
    ){}
}

