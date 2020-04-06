import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProAuthGuard } from 'src/app/core/guards/pro-auth.guard';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookingComponent, canActivate: [ProAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
