import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ClearErrorEmail, CoreSelectors, SaveEmail } from '../../../../core/store';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../../shared/modals/pop-up/pop-up.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewSelectSnapshot(CoreSelectors.errorEmail)
  errorEmail!: string;

  isLoaderFirst: boolean = false;
  isLoaderSecond: boolean = false;
  isLoaderThird: boolean = false;

  emailFormFirst = this.fb.group({
    email: [
      '',
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],
  });

  emailFormSecond = this.fb.group({
    email: [
      '',
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],
  });

  emailFormThird = this.fb.group({
    email: [
      '',
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ],
  });

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.emailFormFirst.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.getEmailFirst?.dirty) {
          this.isLoaderFirst = false;
          this.store.dispatch(new ClearErrorEmail());
        }
      });

    this.emailFormSecond.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.getEmailSecond?.dirty) {
          this.isLoaderSecond = false;
          this.store.dispatch(new ClearErrorEmail());
        }
      });

    this.emailFormThird.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.getEmailThird?.dirty) {
          this.isLoaderThird = false;
          this.store.dispatch(new ClearErrorEmail());
        }
      });
      
      
       
       
     const video1 = document.getElementById('video1') as HTMLVideoElement;
  const video2 = document.getElementById('video2') as HTMLVideoElement;

video1.muted = true;
  video2.muted = true;

  const playVideo1 = () => {
    video1.play();
    setTimeout(() => {
      video1.pause();
      playVideo2();
    }, 15000); 
  };

  const playVideo2 = () => {
    video2.play();
    setTimeout(() => {
      video2.pause();
      playVideo1();
    }, 5060); 
  };

  playVideo1(); 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  get getEmailFirst() {
    return this.emailFormFirst.get('email');
  }

  get getEmailSecond() {
    return this.emailFormSecond.get('email');
  }

  get getEmailThird() {
    return this.emailFormThird.get('email');
  }

  saveEmailFirst(): void {
    const email = this.getEmailFirst?.value;
    this.isLoaderFirst = true;

    if (email) {
      this.store.dispatch(new SaveEmail(email)).subscribe(() => {
        this.openPopup();
        this.isLoaderFirst = false;
        this.emailFormFirst.markAsPristine();

        setTimeout(() => {
          this.emailFormFirst.reset();
        }, 1000);
      });
    }
  }

  saveEmailSecond(): void {
    const email = this.getEmailSecond?.value;
    this.isLoaderSecond = true;

    if (email) {
      this.store.dispatch(new SaveEmail(email)).subscribe(() => {
        this.openPopup();
        this.isLoaderSecond = false;
        this.emailFormSecond.markAsPristine();

        setTimeout(() => {
          this.emailFormSecond.reset();
        }, 1000);
      });
    }
  }

  saveEmailThird(): void {
    const email = this.getEmailThird?.value;
    this.isLoaderThird = true;

    if (email) {
      this.store.dispatch(new SaveEmail(email)).subscribe(() => {
        this.openPopup();
        this.isLoaderThird = false;
        this.emailFormThird.markAsPristine();

        setTimeout(() => {
          this.emailFormThird.reset();
        }, 1000);
      });
    }
  }

  openPopup() {
    this.dialog.open(PopUpComponent, {
      maxWidth: '500px',
      autoFocus: false,
      panelClass: 'popup-modal',
    });
  }





}
