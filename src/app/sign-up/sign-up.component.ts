import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.signupForm);
    var erg = this.authService.signUpUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username);
    if (erg) {
      confirm('Registration successful');
      this.router.navigate(['login']);
    } else {
      console.log('error: Registration failed');
    }
  }
}
