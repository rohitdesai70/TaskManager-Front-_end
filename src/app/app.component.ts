import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from './Services/TaskService/task.service';
import { UserService } from './Services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Task-Manager-FrontEnd';
  logged_in: boolean = false;

  constructor(
    private task: TaskService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) this.logged_in = true;
  }

  Logout = () => {
    this.logged_in = false;
    localStorage.clear();
    this.router.navigate(['']);
  };
}
