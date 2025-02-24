import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservations } from "../models/Reservations";

@Injectable({ providedIn: 'root' })

export class ReservationService {
    private apiUrl = 'https://localhost:7136/api/Reservations'

    constructor(private http: HttpClient) { }

    getReservations(): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetAllReservations`)
    }

    getReservationsByUserId(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetReservationsByUserId?id=${id}`)
    }

    getReservationsHistoryByUserId(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetReservationsHistoryByUserId?id=${id}`)
    }

    getReservationsByDate(date: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetReservationsByDate?date=${date}`)
    }

    saveReservation(Reservation: Reservations): Observable<any> {
        return this.http.post<Reservations>(`${this.apiUrl}/SaveReservation`, Reservation)
    }

    deleteReservation(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/DeleteReservation?id=${id}`)
    }
}