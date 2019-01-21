import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
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
    this.createForm();
  }

  ngOnInit() {
  }

  //function for register form with validators
  createForm() {
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]),
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]),
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(35),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,35}$/)
        ]),
        updateOn: 'change'
      }),
      confirmPassword: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(35),
          this.checkIfMatchingPasswords.bind(this)
        ]),
        updateOn: 'change'
      }),
    });
  }

  //function for checking if passwords match
  checkIfMatchingPasswords(control: AbstractControl): ValidationErrors | null {
    return this.signupForm.value.password === control.value ? null : {notSame: true};
  }

  //register user
  register() {
    const erg = this.authService.signUpUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username);
    if (erg) {
      confirm('Registration successful');
      this.router.navigate(['login']);
    } else {
      confirm('Registration unsuccesful');
      console.log('error: Registration failed');
    }
  }
}
