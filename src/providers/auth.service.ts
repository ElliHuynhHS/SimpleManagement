import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  /** Method to validate and sign in user with email and password */
signInEmail_DB(email, password){
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
}

  signUpUser(email, password, username) {
    const _name = username;
    const _userId = this.userDetails.uid;
    this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
    const doc = this.db.collection('users').doc(this.userDetails.uid);
    try {
      doc.set({
        name: _name,
        userId: _userId
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
