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

  //sign in user with email
  signInEmail_DB(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //register new user
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

  //add new project to the db
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

  //get the right project for the user
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
    return this.db.collection('projects', ref => ref.where('projectId', '==', projectId)).valueChanges();
  }

  //update project with new data
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

  //delete project
  deleteProject(projectId) {
    try {
      this.db.collection('projects').ref.doc(projectId).delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  //get the username of the user
  getUsername() {
    return this.db.collection('users', ref => ref.where('userId', '==', this.userDetails.uid)).valueChanges();
  }

  //change the password
  changePassword(password) {
    var user = firebase.auth().currentUser;
    var newPassword = password;

    user.updatePassword(newPassword).then(function () {
      confirm('Update successful');
    }).catch(function (error) {
      confirm('Update unsuccessful');
    });
  }

  //change the email
  changeEmail(email) {
    var user = firebase.auth().currentUser;
    var newEmail = email;

    user.updateEmail(newEmail).then(function () {
      confirm('Update successful');
    }).catch(function (error) {
      confirm('Update unsuccessful');
    });
  }

  //save image to storage
  async saveToStorage(file) {
    for (let i = 0; i < file.length; i++) {
      var url = await this.setImageToStorage(file[i].file);
      this.profileImageUrl.push(url);
    }
    return this.profileImageUrl;
  }

  //get images from storage
  async setImageToStorage(file) {
    this.storageRef = firebase.storage().ref('profileImages/' + file.name);
    return this.storageRef.put(file).then(async function (snapshot) {
      var profileImage = snapshot.ref.getDownloadURL();
      return profileImage;
    });
  }


}
