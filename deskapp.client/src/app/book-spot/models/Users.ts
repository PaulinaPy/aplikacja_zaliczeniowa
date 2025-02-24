import { Team } from "./Teams";

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    team?: Team;
    position?: Position;
    access?: AccessRights
}

export enum AccessRights {
    User = "USER",
    Admin = "ADMIN"
}
export enum Position {
    Junior = 'JUNIOR',
    Regular = 'MID',
    Senior = 'SENIOR',
    Expert = 'EXPERT',
    ProductOwner = 'PRODUCT OWNER',
    Manager = 'MANAGER',
}

export interface ChangePasswordRequest {
    userId?: string,
    password?: string
}