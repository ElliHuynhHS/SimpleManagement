import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SimpleManagement';
  projects: Observable<any[]>;
  constructor( db: AngularFirestore){
    this.projects = db.collection('projects').valueChanges();
  }
}

