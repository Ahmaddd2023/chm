import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [WaitingListComponent, PaymentComponent, ProfileComponent],
  imports: [SharedModule, MainRoutingModule],
  providers: [DatePipe],
})
export class MainModule {}
