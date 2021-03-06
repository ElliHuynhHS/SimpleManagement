import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../providers/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FileHolder} from 'angular2-image-upload';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {

  //project object
  project = {
    name: '',
    start: '',
    deadline: '',
    cost: '',
    status: ''
  };

  images: Array<any> = [];
  imageFiles: Array<any> = [];
  checkboxJSON: Array<any> = [];
  noticeJSON: Array<any> = [];
  projects: Observable<any[]>;
  id: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = (params['projectId']);
      this.projects = this.authService.getProject(this.id);
    });

  }

  //function for new to do element
  addNewToDo() {
    const todo = window.prompt('Add a todo', 'defaultText');
    const p = document.createElement('p');
    const label = document.createElement('label');
    label.innerText = todo;
    const checkboxList = document.getElementById('includeCheckbox');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'name';
    checkbox.value = 'value';
    checkbox.id = 'id';
    p.appendChild(checkbox);
    p.appendChild(label);
    checkboxList.appendChild(p);
    this.checkboxJSON.push({'label': todo, 'checked': false, 'id:': this.generateId()});
  }

  //function for new note
  addNewNotice(notice) {
    const note = window.prompt('Add a note', 'defaultText');
    const noticeUl = document.getElementById('notice');
    const list = document.createElement('li');
    const label = document.createElement('label');
    label.innerText = note;
    list.appendChild(label);
    noticeUl.appendChild(list);
    this.noticeJSON.push(note);
  }

  //update the project with the new elements
  async updateProject(project) {
    this.images = await this.authService.saveToStorage(this.imageFiles);
    if (this.authService.updateProject(project, this.checkboxJSON, this.noticeJSON, this.images)) {
      confirm('Update successful');
      this.router.navigate(['main']);
    } else {
      confirm('Update unsuccessful');
    }
  }

  //function for uploading new image
  async onUploadFinished(file: FileHolder) {
    this.imageFiles.push(file);
  }

  //function for removing image
  onRemoved(file: FileHolder) {
    this.imageFiles.forEach((item, index) => {
      if (item === file) this.imageFiles.splice(index, 1);
    });
  }

  onUploadStateChanged(state: boolean) {
    console.log(state);
  }

  //function for deleting the project
  deleteProject(projectId) {
    if (this.authService.deleteProject(projectId)) {
      confirm('Delete successful');
      this.router.navigate(['main']);
    } else {
      confirm('Delete unsuccessful');
    }
  }

  //uid for the project
  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }


}
