import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CoreState } from './store';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NgxsModule.forRoot([CoreState]),
    // NgxsLoggerPluginModule.forRoot({ disabled: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: CoreState,
    }),
  ],
  providers: [],
})
export class CoreModule {}
