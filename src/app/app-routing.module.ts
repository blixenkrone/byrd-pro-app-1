import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  // { path: `dashboard`, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: `tip`, loadChildren: () => import('./components/story-tipper/story-tipper.module').then(m => m.StoryTipperModule) },
  { path: `upload`, loadChildren: () => import('./components/upload/upload.module').then(m => m.UploadModule) },
  { path: `bookings`, loadChildren: () => import('./components/booking/booking.module').then(m => m.BookingModule), pathMatch: 'full' },
  { path: `login`, loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule), pathMatch: 'full' },
  { path: '**', redirectTo: 'upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
