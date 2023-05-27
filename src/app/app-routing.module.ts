import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { StudentsComponent } from './doctor/components/students/students.component';
import { SubjectsComponent } from './doctor/components/subjects/subjects.component';
import { ExamComponent } from './student/components/exam/exam.component';
import { AuthGuard } from './Gaurds/auth.guard';

const routes: Routes = [
  {path:'' ,redirectTo:'login', pathMatch :"full"},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'exam/:id' , component:ExamComponent , canActivate :[AuthGuard]},
  {path:'students' , component:StudentsComponent , canActivate :[AuthGuard]},
  {path:'subjects' , component:SubjectsComponent , canActivate :[AuthGuard] },
  {path:'new-exam' , component:NewExamComponent , canActivate :[AuthGuard]},
  {path:'**' , redirectTo:'login' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
