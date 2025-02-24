import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSpotComponent } from './book-spot/book-home/book-spot.component';
import { AdminPanelComponent } from './book-spot/admin-panel/admin-panel.component';
import { LoginComponent } from './book-spot/login/login.component';
import { ContactPanelComponent } from './book-spot/contact-panel/contact-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutUsComponent } from './book-spot/about-us/about-us.component';
import { ReservationComponent } from './book-spot/reservation/reservation.component';

export const routes: Routes = [
  { path: '', component: BookSpotComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact-panel', component: ContactPanelComponent },
  { path: 'about-us', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }