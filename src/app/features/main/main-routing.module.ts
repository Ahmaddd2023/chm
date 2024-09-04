import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'waiting-list', component: WaitingListComponent },
  { path: 'pricing', component: PaymentComponent },
  { path: 'payments', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
