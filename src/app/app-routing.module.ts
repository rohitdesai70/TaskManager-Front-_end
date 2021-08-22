import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddTodoComponent } from './MyComponents/add-todo/add-todo.component';
import { AllTasksComponent } from './MyComponents/all-tasks/all-tasks.component';

const routes: Routes = [
  { path: 'dashboard', component: AddTodoComponent },
  { path: '', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
