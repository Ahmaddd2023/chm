import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './modals/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import {BalacePointsToUsdPipe} from "./pipes/balace-points-to-usd.pipe";

@NgModule({
  declarations: [PopUpComponent, BalacePointsToUsdPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    BalacePointsToUsdPipe
  ],
  providers: [BalacePointsToUsdPipe],
})
export class SharedModule {}
