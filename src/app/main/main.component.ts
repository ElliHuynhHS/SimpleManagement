import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../providers/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public projects: Observable<any[]>;
  cost: number = 0;
  pendingCost: number = 0;
  term: any;
  searchValue = 'name';

  constructor(public authService: AuthService) {
    this.projects = authService.getProjectsForUser();

    this.calculateCost();
    this.calculatePendingCost();
  }

  ngOnInit() {
  }

  calculateCost() {
    this.cost = 0;
    let project: Array<any> = [];
    this.projects.subscribe(data => {
        project = data;
        for (let pro of project) {
          if (pro.cost != 0) {
            this.cost = this.cost + parseInt(pro.cost);
          }
        }
      },
      error => {

      });
  }

  calculatePendingCost() {
    this.pendingCost = 0;
    let status: Array<any> = [];
    this.projects.subscribe(data => {
      status = data;
      for (let stat of status) {
        if (stat.status === 1) {
          if (stat.cost != 0) {
            this.pendingCost = this.pendingCost + parseInt(stat.cost);
          }
        }
      }
    });
  }

  getPercent(project) {
    var ret = 0;
    if (project.tasks.length != 0) {
      var length = 0;
      length = project.tasks.length;
      var counter = 0;
      for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].checked) {
          counter++;
        }
      }
      var erg = 0;
      erg = (length / 100);
      ret = (counter / erg);
    }
    else {
      ret = 0;
    }
    return ret;
  }

  filterValue(value) {
    this.searchValue = 'status';
    if (value === 4) {
      this.searchValue = 'name';
      this.term = '';
    } else {
      this.term = value;
    }
  }

}
