import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private storageRef: any;
  private profileImageUrl: Array<any> = [];

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
  signInEmail_DB(email, password) {
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

  addNewProject(project, checkbox, note, images) {
    const name = project.name;
    const start = project.start;
    const deadline = project.deadline;
    const cost = project.cost;
    const task = checkbox;
    const notice = note;
    const image = images;
    const description = project.description;
    var docId = this.db.createId();
    var doc = this.db.collection('projects').doc(docId);

    try {
      doc.set({
        userId: this.userDetails.uid,
        name: name,
        description: description,
        start: start,
        deadline: deadline,
        cost: cost,
        tasks: task,
        notice: notice,
        status: 1,
        projectId: docId,
        image: image
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  getProjectsForUser() {
    return this.db.collection('projects', ref => ref.where('userId', '==', this.userDetails.uid)).valueChanges();
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  getProject(projectId) {
    console.log('auth service ' +
      this.db.collection('projects', ref => ref.where('projectId', '==', projectId)).valueChanges());
    return this.db.collection('projects', ref => ref.where('projectId', '==', projectId)).valueChanges();
  }

  updateProject(project, checkbox, note, images) {
    const id = project.projectId;
    const name = project.name;
    const start = project.start;
    const deadline = project.deadline;
    const cost = project.cost;
    const task = checkbox;
    const notice = note;
    const status = project.status;
    const image = images;
    const description = project.description;

    try {
      this.db.collection('projects').doc(id).update({
        userId: this.userDetails.uid,
        name: name,
        start: start,
        deadline: deadline,
        description: description,
        cost: cost,
        tasks: task,
        notice: notice,
        status: status,
        image: image
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  deleteProject(projectId) {
    try {
      this.db.collection('projects').ref.doc(projectId).delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  getUsername() {
    return this.db.collection('users', ref => ref.where('userId', '==', this.userDetails.uid)).valueChanges();
  }

  changePassword(password) {
    var user = firebase.auth().currentUser;
    var newPassword = password;

    user.updatePassword(newPassword).then(function () {
      confirm('Update successful');
    }).catch(function (error) {
      confirm('Update unsuccessful');
    });
  }

  changeEmail(email) {
    var user = firebase.auth().currentUser;
    var newEmail = email;

    user.updateEmail(newEmail).then(function () {
      confirm('Update successful');
    }).catch(function (error) {
      confirm('Update unsuccessful');
    });
  }

  async saveToStorage(file) {
    for (let i = 0; i < file.length; i++) {
      console.log('Url to Storage:' + file[i].file);
      var url = await this.setImageToStorage(file[i].file);
      this.profileImageUrl.push(url);
    }
    return this.profileImageUrl;
  }

  async setImageToStorage(file) {
    console.log('SetImageToStorage Methode StorageRef ' + file.name);

    this.storageRef = firebase.storage().ref('profileImages/' + file.name);
    console.log('SetImageToStorage Methode StorageRef ' + this.storageRef);
    return this.storageRef.put(file).then(async function (snapshot) {
      var profileImage = snapshot.ref.getDownloadURL();
      console.log(profileImage);
      return profileImage;
    });
  }


}
