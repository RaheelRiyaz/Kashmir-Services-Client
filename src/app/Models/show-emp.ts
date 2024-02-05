import { Role } from "../Enums/role";
import { Status } from "../Enums/status";

export class ShowEmp {
    constructor(
        public searchTerm="",
        public status:Status=Status.Active,
        public roles:Role=Role.Manager
    ){}
}
