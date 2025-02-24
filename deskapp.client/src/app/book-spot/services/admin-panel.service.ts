import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChangePasswordRequest, User } from "../models/Users";
import { Desk } from "../models/Desks";

@Injectable({ providedIn: 'root' })

export class AdminPanelService {
    private apiUrl = 'https://localhost:7136/api/AdminPanel'

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetAllUsers`)
    }

    addUser(User: User): Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/AddUser`, User)
    }

    editUser(User: User): Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/EditUser`, User)
    }

    changePassword(ChangePasswordRequest: ChangePasswordRequest): Observable<any> {
        return this.http.post<ChangePasswordRequest>(`${this.apiUrl}/ChangePassword`, ChangePasswordRequest)
    }

    deleteUser(Id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/DeleteUser?id=${Id}`)
    }

    getAllDesks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetAllDesks`)
    }

    saveDesks(Desks: Desk[]): Observable<any> {
        return this.http.post<Desk[]>(`${this.apiUrl}/SaveDesks`, Desks)
    }

    deleteDesk(Id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/DeleteDesk?id=${Id}`)
    }
}