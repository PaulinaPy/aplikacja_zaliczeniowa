import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Canvas, FabricImage, Rect, FabricText, Group } from "fabric";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Toast } from "primeng/toast";
import { Desk, DeskObject } from "../models/Desks";
import { v4 as uuidv4 } from 'uuid';
import { AdminPanelService } from "../services/admin-panel.service";


@Component({
  selector: 'app-admin-panel-desk',
  imports: [ButtonModule, Toast],
  templateUrl: './admin-panel-desk.component.html',
  styleUrl: './admin-panel-desk.component.css',
  providers: [MessageService]
})


export class AdminPanelDeskComponent implements OnInit {

  @ViewChild('canvasAdmin', { static: true }) canvasRef!: ElementRef;
  canvas!: Canvas;
  isDrawing = false;
  desks: Desk[] = []

  constructor(
    private adminPanelService: AdminPanelService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    this.canvas = new Canvas(this.canvasRef.nativeElement, {
      width: 1000,
      height: 1000
    });
    this.setBackgroundImage('assets/images/rzut.jpg');
    this.adminPanelService.getAllDesks().subscribe((result) => {
      this.desks = result
      this.drawDesks()
    })
  }

  setBackgroundImage(imageUrl: string): void {
    if (!this.canvas) return;
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

  addDesk(): void {
    const centerX = this.canvas.width! / 2;
    const centerY = this.canvas.height! / 2;
    var deskId = this.canvas.getObjects().length + 1
    while (this.desks.some(desk => desk.label === "BS." + deskId)) {
      deskId = deskId - 1;
    }
    const desk = new Rect({
      left: centerX - 25,
      top: centerY - 25,
      width: 120,
      height: 120,
      fill: 'rgba(4, 105, 172, 0.5)',
      stroke: 'rgba(1, 57, 95, 0.5)',
      strokeWidth: 2
    });
    const textObj = new FabricText("BS." + deskId, {
      left: centerX + 35,
      top: centerY + 35,
      fontSize: 20,
      fill: 'black',
      fontFamily: 'Arial',
      textAlign: 'center',
      originX: 'center',
      originY: 'center'
    });
    const group = new Group([textObj, desk], {
      left: centerX - 50,
      top: centerY - 50,
      hasControls: false,
      selectable: true,
      lockScalingX: true,
      lockScalingY: true,
      id: uuidv4()
    } as DeskObject)
    this.canvas.add(group);
    this.canvas.renderAll();
  }

  drawDesks() {
    this.desks.forEach(deskData => {
      const desk = new Rect({
        left: deskData.left - 25,
        top: deskData.top - 25,
        width: 120,
        height: 120,
        fill: 'rgba(4, 105, 172, 0.5)',
        stroke: 'rgba(1, 57, 95, 0.5)',
        strokeWidth: 2
      });
      const textObj = new FabricText((deskData.label as string), {
        left: deskData.left + 35,
        top: deskData.top + 35,
        fontSize: 20,
        fill: 'black',
        fontFamily: 'Arial',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      });
      const group = new Group([textObj, desk], {
        left: deskData.left,
        top: deskData.top,
        hasControls: false,
        selectable: true,
        lockScalingX: true,
        lockScalingY: true,
        id: deskData.id
      } as DeskObject)
      this.canvas.add(group);
    })
    this.canvas.renderAll();
  }

  saveDesk() {
    this.desks = this.canvas.getObjects().map(obj => {
      if (obj instanceof Group) {
        const deskData: Desk = {
          id: (obj as any).id,
          left: obj.left!,
          top: obj.top!,
          label: null
        };
        const deskObjects = obj.getObjects();
        const textObject = deskObjects.find(deskObj => deskObj instanceof FabricText);
        if (textObject) {
          deskData.label = textObject.text || '';
        }
        return deskData;
      }
      return null;
    }).filter(data => data !== null) as Desk[];
    this.adminPanelService.saveDesks(this.desks).subscribe((result) => { this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Biurka zostały zapisane.' }); })
  }

  deleteDesk() {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject instanceof Group) {
      this.adminPanelService.deleteDesk((activeObject as any).id as string).subscribe((result) => {
        this.canvas.remove(activeObject);
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Biurko zostało usunięte.' });
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Proszę zaznaczyć biurko!' });
    }
  }
}

