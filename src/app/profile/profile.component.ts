import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../providers/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public userObject: Observable<any[]>;
  changeObject = {
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userObject = this.authService.getUsername();
    console.log(this.userObject);
  }

  changePassword(password) {
    this.authService.changePassword(password);
  }

  changeEmail(email) {
    this.authService.changeEmail(email);
  }

  onClickSave() {
    if ((this.changeObject.password != null) && (this.changeObject.confirmPassword != null)) {
      this.changePassword(this.changeObject.password);
    }
    if ((this.changeObject.email != null) && (this.changeObject.confirmEmail != null)) {
      this.changeEmail(this.changeObject.email);
    }
    if ((this.changeObject.password == null) && (this.changeObject.confirmPassword == null) &&
      (this.changeObject.email == null) && (this.changeObject.confirmEmail == null)) {
    }
  }

}
