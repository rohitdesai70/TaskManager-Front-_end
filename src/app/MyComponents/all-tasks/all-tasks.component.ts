import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { task } from 'src/models/tasks';

import { TaskService } from '../../Services/TaskService/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  response: any;
  errorMessage: string;

  @Output() getTasks: EventEmitter<String> = new EventEmitter();
  @Output() editTasksEmitter = new EventEmitter();
  @Input() callGetTask: boolean;

  private eventsSubscription: Subscription;

  constructor(private task_service: TaskService) {}

  ngOnInit(): void {
    this.getTask();
  }

  deleteTasks = (id: string) => {
    this.task_service
      .deleteTask({
        user_id: localStorage.getItem('user_id'),
        task_id: id,
      })
      .subscribe(
        () => {
          this.getTask();

          alert('Deleted');
        },
        (error) => {
          alert('!OOPs Something Went Wrong');
          console.log('error in deleting tasks', error);
        }
      );
  };

  editTasks = (value: task) => {
    this.editTasksEmitter.emit(value);

    this.task_service.taskDetails = value;
  };

  getTask = () => {
    this.task_service.getAllTasks(localStorage.getItem('user_id')).subscribe(
      (res: task) => {
        if (!(res.task.length > 0)) {
          this.response = null;
        } else {
          this.response = res;
        }
      },
      (err) => {
        console.log('errror', err.message);
      }
    );
  };
}
