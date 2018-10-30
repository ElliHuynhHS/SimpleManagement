import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if(user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

}
