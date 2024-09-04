import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

@NgModule({
  declarations: [LandingComponent, PrivacyComponent, TermsComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
