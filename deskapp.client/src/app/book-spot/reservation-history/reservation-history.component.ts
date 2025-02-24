import { Component, OnInit, ViewChild } from "@angular/core";
import { ReservationService } from "../services/reservation.service";
import { DatePipe } from "@angular/common";
import { AccordionModule } from "primeng/accordion";
import { MenuModule } from "primeng/menu";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { DividerModule } from "primeng/divider";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-reservation-history',
  imports: [AccordionModule, MenuModule, TableModule, ButtonModule, PaginatorModule, DividerModule, FormsModule, DatePipe],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css',
  standalone: true
})


export class ReservationHistoryComponent implements OnInit {
  @ViewChild('dt1') dt1: any
  myReservations: any[] = []

  constructor(private reservationService: ReservationService) { }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.reservationService.getReservationsHistoryByUserId(userId).subscribe((res: any) => {
        this.myReservations = res
      });
    } else {
      console.error('User ID is null');
    }
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;  // Type casting
    if (target) {
      // Safe to access value here
      this.dt1.filterGlobal(target.value, 'contains');
    }
  }

}