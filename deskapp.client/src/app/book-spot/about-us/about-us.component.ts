import { Component } from "@angular/core"
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-about-us',
  imports: [AccordionModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  standalone: true

})
export class AboutUsComponent { }