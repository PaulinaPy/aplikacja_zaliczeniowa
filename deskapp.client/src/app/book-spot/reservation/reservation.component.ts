import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FullCalendarComponent, FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { Menu } from "primeng/menu";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Toast } from "primeng/toast";
import { Reservations } from "../models/Reservations";
import { Dialog } from "primeng/dialog";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { Canvas, FabricImage, Rect, FabricText, Group } from "fabric";
import { AdminPanelService } from "../services/admin-panel.service";
import { Desk, DeskObject } from "../models/Desks";
import { UserService } from "../services/user.service";
import { ReservationService } from "../services/reservation.service";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { ReservationHistoryComponent } from "../reservation-history/reservation-history.component";

@Component({
  selector: 'app-reservation',
  imports: [Menu, FullCalendarModule, Toast, Dialog, CommonModule, InputTextModule, FormsModule, ButtonModule, ConfirmDialogModule, ReservationHistoryComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})


export class ReservationComponent implements OnInit {
  activeIndex: number = 0;
  @ViewChild('canvasReservation') canvasRef!: ElementRef;
  canvas!: Canvas;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  items: MenuItem[] = [];

  viewDate: Date = new Date();
  reservation: Reservations = {}
  reservationDetails: any = { firstName: '', lastName: '', email: '', team: '', desk: '' }
  displayDesks: boolean = false
  displayReservationDetails: boolean = false
  allDesks: Desk[] = []
  availableDesks: Desk[] = []
  unavailableDesks: Desk[] = []
  reservationsByDate: Reservations[] = []
  myReservations: Reservations[] = []
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    timeZone: 'UTC',
    locale: 'pl',
    firstDay: 1,
    events: [],
    themeSystem: 'booystrap5',
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg)
  };

  constructor(private adminPanelService: AdminPanelService, private userService: UserService, private reservationService: ReservationService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.adminPanelService.getAllDesks().subscribe((result) => {
      this.allDesks = result

    })
    this.initializeCalendarEvents()
    this.items = [
      {
        label: 'WYKONAJ REZERWACJĘ',
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.activeIndex = 0
          this.initializeCalendarEvents()
        }
      },
      {
        label: 'HISTORIA REZERWACJI',
        icon: 'pi pi-history',
        command: () => this.activeIndex = 1
      }
    ]
  }

  clearData() {
  }

  handleEventClick(arg: any) {
    const calendarApi = this.calendarComponent.getApi();
    const event = calendarApi.getEventById(arg.event.id);

    if (event) {
      this.confirmationService.confirm({
        message: 'Czy na pewno chcesz usunąć rezerwacje?',
        header: 'Usuwanie rezerwacji',
        icon: 'pi pi-exclamation-triangle',
        position: 'top',
        accept: () => {
          this.reservationService.deleteReservation(arg.event.id).subscribe(() => {
            this.initializeCalendarEvents()
          })
        },
        acceptButtonProps: { outlined: true, severity: 'info' },
        rejectButtonProps: { severity: 'danger' }
      })
    } else {
      console.warn('Event not found:', arg.event.id);
    }
  }

  handleDateClick(arg: any) {
    this.viewDate = arg.date;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.viewDate < today) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie można wybrać daty przeszłej.' });
      return;
    }
    this.reservation.bookedDate = this.viewDate
    this.reservation.userId = localStorage.getItem('userId') ?? undefined
    this.initializeDesksDialog()
  }
  initializeCalendarEvents() {
    this.reservationService.getReservationsByUserId(localStorage.getItem('userId') ?? '').subscribe((result) => {
      this.myReservations = result
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.removeAllEvents()
      this.myReservations.forEach((reservation) => {
        var desk = this.allDesks.find(desk => desk.id === reservation.deskId)
        const title = desk?.label ? desk.label : 'Unknown Desk';
        calendarApi.addEvent({ id: reservation.id, title: 'Biurko: ' + title, date: reservation.bookedDate, allDay: true, color: '#FF0000' })
      })
    })
  }
  initializeDesksDialog() {
    this.initializeCanvas();
    this.displayDesks = true
  }
  initializeCanvas(): void {
    this.canvas = new Canvas(this.canvasRef.nativeElement, {
      width: 650,
      height: 650
    });

    this.setBackgroundImage('assets/images/rzut.jpg');
    this.adminPanelService.getAllDesks().subscribe((result) => {
      this.allDesks = result
      this.drawDesks()
    })
    this.canvas.on('selection:created', this.onObjectSelect.bind(this));
    this.drawDesks()

  }

  setBackgroundImage(imageUrl: string): void {
    if (!this.canvas) return;

    // ✅ Use FabricImage.fromURL() instead of fromElement()
    FabricImage.fromURL(imageUrl).then((fabricImg) => {
      if (!fabricImg) return;

      fabricImg.set({
        selectable: false,
        evented: false,
        scaleX: this.canvas.width! / fabricImg.width!,
        scaleY: this.canvas.height! / fabricImg.height!
      });

      this.canvas.backgroundImage = fabricImg;
      this.canvas.renderAll();
    }).catch(error => console.error('Error loading background image:', error));
  }
  drawDesks() {
    this.reservationService.getReservationsByDate(this.viewDate.toDateString()).subscribe((result) => {
      this.reservationsByDate = result
      this.availableDesks = this.allDesks.filter(desk => !this.reservationsByDate.find(reservation => reservation.deskId === desk.id))
      this.unavailableDesks = this.allDesks.filter(desk => this.reservationsByDate.find(reservation => reservation.deskId === desk.id))

      this.availableDesks.forEach(deskData => {
        const desk = new Rect({
          left: (deskData.left - 25) * 0.65,
          top: (deskData.top - 25) * 0.65,
          width: 78,
          height: 78,
          fill: 'rgba(4, 105, 172, 0.5)',
          stroke: 'rgba(1, 57, 95, 0.5)',
          strokeWidth: 2
        });

        const textObj = new FabricText((deskData.label as string), {
          left: (deskData.left + 35) * 0.65,
          top: (deskData.top + 35) * 0.65,
          fontSize: 20,
          fill: 'black',
          fontFamily: 'Arial',
          textAlign: 'center',
          originX: 'center',
          originY: 'center'
        });

        const group = new Group([textObj, desk], {
          left: deskData.left * 0.65,
          top: deskData.top * 0.65,
          hasControls: false,
          selectable: true,
          lockScalingX: true,
          lockScalingY: true,
          lockMovementX: true,
          lockMovementY: true,
          id: deskData.id
        } as DeskObject)
        this.canvas.add(group);
      })
      this.unavailableDesks.forEach(deskData => {
        const desk = new Rect({
          left: (deskData.left - 25) * 0.65,
          top: (deskData.top - 25) * 0.65,
          width: 78,
          height: 78,
          fill: 'rgba(172, 43, 4, 0.74)',
          stroke: 'rgba(95, 36, 1, 0.5)',
          strokeWidth: 2
        });

        const textObj = new FabricText((deskData.label as string), {
          left: (deskData.left + 35) * 0.65,
          top: (deskData.top + 35) * 0.65,
          fontSize: 20,
          fill: 'black',
          fontFamily: 'Arial',
          textAlign: 'center',
          originX: 'center',
          originY: 'center'
        });

        const group = new Group([textObj, desk], {
          left: deskData.left * 0.65,
          top: deskData.top * 0.65,
          hasControls: false,
          selectable: false,
          lockScalingX: true,
          lockScalingY: true,
          lockMovementX: true,
          lockMovementY: true,
          id: deskData.id
        } as DeskObject)
        this.canvas.add(group);
      })
      this.canvas.renderAll();
    })
  }

  onObjectSelect(e: any) {
    const selectedObject = e.selected[0];
    if (selectedObject && selectedObject instanceof Group) {
      this.reservation.deskId = (selectedObject as any).id as string
      this.CloseDesksDialog()
      this.InitializeReservationDetailsDialog()
    }
  }
  CloseDesksDialog() {
    this.displayDesks = false
    this.canvas.dispose()
  }

  InitializeReservationDetailsDialog() {
    this.userService.getById(localStorage.getItem('userId') ?? '').subscribe({
      next: (result) => {
        this.reservationDetails.firstName = result.firstName
        this.reservationDetails.lastName = result.lastName
        this.reservationDetails.email = result.email
        this.reservationDetails.team = result.team
        this.reservationDetails.desk = this.availableDesks.find(desk => desk.id === this.reservation.deskId)?.label

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Error!' });
      },
      complete: () => {
        this.displayReservationDetails = true
      }
    })
  }
  confirmReservation() {
    this.reservationService.saveReservation(this.reservation).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Rezerwacja została zapisana.' });
        this.displayReservationDetails = false;
        this.initializeCalendarEvents();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error });
      }
    })
  }

};








