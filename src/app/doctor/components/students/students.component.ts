import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource:any
  datatable:any
  displayedColumns:any
  percentage :number = 0
  constructor(private service:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree','percentage'];
   }


  ngOnInit(): void {
    this.getStudents()
  }


  getStudents() {
    this.service.getUsers('students').subscribe((res:any) => {
      this.dataSource = res?.map((student:any) => {
        if(student?.subjects) {
          return student?.subjects?.map((sub:any) => {
            return {
              name:student.username,
              subjectName:sub.name,
              degree:sub.degree,
              fullMark:sub.fullMark,
              percentage:sub.percentage
            }
          })
        }else {
          return [{
            name:student.username,
            subjectName:"-",
            degree:"-",
            fullMark:"-",
            percentage:"-"
          }]
        }

      })
      this.datatable = [];

      this.dataSource.forEach((item:any) => {
        this.datatable.push(...item);

      })

    })

  }
}
