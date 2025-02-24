import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

@Injectable({ providedIn: 'root' })

export class UserService {
    private apiUrl = 'https://localhost:7136/api/User'

    constructor(private http: HttpClient) { }

    getById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetById?id=${id}`)
    }

    getDeskById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetDeskById?id=${id}`)
    }
}