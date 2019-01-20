import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';


import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorage} from 'angularfire2/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment.prod';

import {AuthService} from '../providers/auth.service';
import {LoginComponent} from './login/login.component';
import {AppRoutes} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AddprojectComponent} from './addproject/addproject.component';
import {AuthguardService} from '../providers/authguard.service';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {ProjectdetailsComponent} from './projectdetails/projectdetails.component';
import {ProfileComponent} from './profile/profile.component';
import {ImageUploadModule} from 'angular2-image-upload';
import { SearchPipe } from '../providers/search-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignUpComponent,
    AddprojectComponent,
    ProjectdetailsComponent,
    ProfileComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      backgroundPadding: 1,
      radius: 25,
      maxPercent: 100,
      outerStrokeWidth: 8,
      outerStrokeColor: '#008080',
      innerStrokeColor: '#50a0a0',
      titleFontSize: '15',
      showSubtitle: false,
      showBackground: false
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()

  ],
  providers: [AngularFirestore, AuthService, AuthguardService, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
