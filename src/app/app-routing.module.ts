import {LoginComponent} from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import {main} from '@angular/compiler-cli/src/main';
import {MainComponent} from './main/main.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'main',
    component: MainComponent
  },


  {
    path: 'login',
    component: LoginComponent
  }];

export const AppRoutes = RouterModule.forRoot(appRoutes);
