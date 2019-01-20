import {LoginComponent} from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import {main} from '@angular/compiler-cli/src/main';
import {MainComponent} from './main/main.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AddprojectComponent} from './addproject/addproject.component';
import {AuthguardService} from '../providers/authguard.service';
import {ProjectdetailsComponent} from './projectdetails/projectdetails.component';
import {ProfileComponent} from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'main',
    canActivate: [AuthguardService],
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'projectDetails',
    // canActivate: [AuthguardService],
    component: ProjectdetailsComponent
  },
  {
    path: 'profile',
    canActivate: [AuthguardService],
    component: ProfileComponent
  },
  {
    path: 'addProject',
    component: AddprojectComponent,
    canActivate: [AuthguardService]
  }];

export const AppRoutes = RouterModule.forRoot(appRoutes);
