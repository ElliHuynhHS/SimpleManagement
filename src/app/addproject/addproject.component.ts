import {Component, IterableDiffers, OnInit} from '@angular/core';
import {AuthService} from '../../providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  project = {
    name: '',
    description: '',
    start: '',
    deadline: '',
    cost: '',
    tasks: []
  };

  checkboxJSON: Array<any> = [];
  noticeJSON: Array<any> = [];
  isAddNewTodo = false;
  iterableDiffer: any;
  changes = false;

  constructor(private authService: AuthService, private router: Router, private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck(){
    this.changes = this.iterableDiffer.diff(this.checkboxJSON);
  }

  addNewToDo(){
    this.isAddNewTodo = true;
    var todo = window.prompt('Add a todo', 'defaultText');
    var checkboxId = this.generateId();
    this.checkboxJSON.push({'label': todo, 'checked': false, 'id': checkboxId});
  }

  checkboxChange(event: any, id: any){
    for(let task of this.checkboxJSON){
      if(id === task.id){
        task.checked = event.currentTarget.checked;
      }
    }
  }

  addNewNotice(){
    var note = window.prompt('Add a note', 'defaultText');
    var noticeUl = document.getElementById('notice');
    var list = document.createElement('li');
    var label = document.createElement('label');
    label.innerText = note;
    list.appendChild(label);
    noticeUl.appendChild(list);
    this.noticeJSON.push(note);
  }

  saveNewProject(){
    if(this.authService.addNewProject(this.project, this.checkboxJSON, this.noticeJSON)){
      confirm('Save was sucessful');
      this.router.navigate(['main']);
    }else{
      confirm('Save was unsuccessful');
    }
  }

  generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
