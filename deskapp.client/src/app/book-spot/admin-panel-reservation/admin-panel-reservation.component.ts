import { Component, OnInit, ViewChild } from "@angular/core"
import { FormsModule, NumberValueAccessor } from "@angular/forms";
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { MenuModule } from "primeng/menu";
import { PaginatorModule } from "primeng/paginator";
import { TableModule } from "primeng/table";
import { ReservationService } from "../services/reservation.service";
import { DatePipe } from "@angular/common";




@Component({
  selector: 'app-admin-panel-reservation',
  imports: [AccordionModule, MenuModule, TableModule, ButtonModule, PaginatorModule, DividerModule, FormsModule, TableModule, DatePipe],
  templateUrl: './admin-panel-reservation.component.html',
  styleUrl: './admin-panel-reservation.component.css',
  standalone: true

})
export class AdminPanelReservationComponent implements OnInit {
  @ViewChild('dt1') dt1: any;
  items: MenuItem[] = [];
  tableMenuItems: MenuItem[] = [];
  allReservations: any[] = [];
  user: any;
  constructor(private reservationService: ReservationService) { }
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res: any) => {
      this.allReservations = res
    })
  }
  
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.dt1.filterGlobal(target.value, 'contains');
    }
  }
}
