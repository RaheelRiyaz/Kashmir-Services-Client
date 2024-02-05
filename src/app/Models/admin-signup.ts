export class AdminSignup {
  constructor(
    public fullName?: string,
    public email?: string,
    public phoneNumber?: string,
    public userRole: number = 0
  ) {}
}
