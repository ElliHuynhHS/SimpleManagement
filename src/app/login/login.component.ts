import {AuthService} from '../../providers/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  signInWithEmail() {
    this.authService.signInEmail_DB(this.user.email, this.user.password)
      .then((res) => {
        this.router.navigate(['main']);
      })
      .catch((err) => confirm(err));

  }
}
