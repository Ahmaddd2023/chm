import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {
  constructor(public dialogRef: MatDialogRef<PopUpComponent>) {}

  onClose() {
    this.dialogRef.close();
  }
}
