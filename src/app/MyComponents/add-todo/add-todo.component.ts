import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { task } from 'src/models/tasks';
import { TaskService } from '../../Services/TaskService/task.service';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  due_date: string;
  description: string;
  name: string;
  edit = false;
  task_option = 'Add Task';
  edit_task_id: string;
  date: string;

  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(AllTasksComponent) child: AllTasksComponent;

  constructor(
    private task_service: TaskService,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) this.router.navigate(['']);
  }

  onSubmit = () => {
    if (this.edit == false) {
      this.task_service
        .insertTask({
          task: this.name,
          due_date: this.due_date,
          description: this.description,
          user_id: localStorage.getItem('user_id'),
        })
        .subscribe(
          () => {
            this.child.getTask();
          },
          (err) => {
            alert('Something went wrong');
          }
        );
    } else {
      // Code to edit Tasks

      this.edit = false;
      this.task_option = 'Add Task';

      this.task_service
        .editDetails({
          task_id: this.edit_task_id,
          new_task: this.name,
          due_date: this.due_date,
          description: this.description,
        })
        .subscribe(
          (res: task) => {
            // this.response = res;
            this.child.getTask();
          },
          (err) => {
            console.log('errror', err.message);
          }
        );
      this.name = this.due_date = this.description = '';
    }
  };

  editTasks = async (value: task) => {
    this.edit = true;

    this.edit_task_id = value._id;
    this.name = value.task;
    this.description = value.description;

    this.task_option = 'Edit Task';

    let d = new Date(value.due_date);

    let date = new Date(value.due_date);
    var latest_date = await this.datepipe.transform(date, 'yyyy-MM-dd');

    if (latest_date != null) {
      this.due_date = latest_date;
    }
  };
}
