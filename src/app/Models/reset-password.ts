export class ResetPassword {
    constructor(
        public token?:string,
        public newPassword?:string,
        public confrimPassword?:string
    ){}
}

