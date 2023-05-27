import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  name = new FormControl("");
  questionForm!:FormGroup;
  questions:any[] = [];
  correctNum:any;
  subjectName = "";
  stepperIndex = 0;
  startAdd:boolean = false
  preview:boolean = false
  id:any;
  subjects:any[] = [];
  constructor(private fb:FormBuilder , private toaster:ToastrService , private service:DoctorService) { }

  ngOnInit(): void {
    this.service.getAllSubjects().subscribe((res:any) => {
      this.subjects = res
    })
    this.createForm()
  }

  createForm() {
    this.questionForm = this.fb.group({
      question:['' , [Validators.required]],
      answer1:['' , [Validators.required]],
      answer2:['' , [Validators.required]],
      answer3:['' , [Validators.required]],
      answer4:['' , [Validators.required]]
    })
  }

  createQuestion() {
    let exist = this.questions.findIndex(item => item.question == this.questionForm.value.question )
    if (exist != -1){
      this.toaster.error("هذا السوال تم ادخاله مسبقا")
      if(confirm(`هل تريد ادخل السوال مره اخري ؟ `)){
        if(this.correctNum) {
          const model = {
            question: this.questionForm.value.question,
            answer1: this.questionForm.value.answer1,
            answer2: this.questionForm.value.answer2,
            answer3: this.questionForm.value.answer3,
            answer4: this.questionForm.value.answer4,
            correctAnswer:this.questionForm.value[this.correctNum]
          }
          this.questions.push(model)
          this.questionForm.reset()
        }else {
          this.toaster.error("يرجي اختبار الاجابة الصحيحه")
        }
      }
    }else{
      if(this.correctNum) {
        const model = {
          question: this.questionForm.value.question,
          answer1: this.questionForm.value.answer1,
          answer2: this.questionForm.value.answer2,
          answer3: this.questionForm.value.answer3,
          answer4: this.questionForm.value.answer4,
          correctAnswer:this.questionForm.value[this.correctNum]
        }
        this.questions.push(model)
        this.questionForm.reset()
      }else {
        this.toaster.error("يرجي اختبار الاجابة الصحيحه")
      }
    }

  }

  start() {
    if(this.name.value == "" || this.name.value == " ") {
      this.toaster.error("يرجي ادخال اسم المادة")
    }else {
      let existSubject = this.subjects.findIndex(item => item.name == this.name.value)
      if(existSubject != -1 ){
        this.toaster.error(`اختبار مادة ${this.name.value} موجد بالفعل`)
        this.startAdd = false
        this.stepperIndex = 0
      }else{
        this.startAdd = true
        this.subjectName = this.name.value
        this.stepperIndex = 1
      }
    }
  }

  clearForm() {
    this.questionForm.reset()
  }

  cancel() {
    this.questionForm.reset()
    this.questions = [];
    this.subjectName = "";
    this.name.reset();
    this.stepperIndex = 0;
    this.startAdd = false
  }
  getCorrect(event:any) {
    this.correctNum = event.value
  }
  submit() {
    const model = {
      name:this.subjectName,
      questions:this.questions
    }
    if(this.preview) {
      this.stepperIndex = 2
    }else {
      this.service.createSubject(model).subscribe((res:any) => {
        this.preview = true;
        this.id = res.id
      })
    }
  }


  delete(index:number) {
    this.questions.splice(index , 1)
    const model = {
      name:this.subjectName,
      questions:this.questions
    }

    this.service.updateSubject(model , this.id).subscribe(res => {
      this.toaster.success("تم حذف السؤال بنجاح")
    })
  }

}


// getSubjects() {
//   this.service.getAllSubjects().subscribe((res:any) => {
//     this.subjects = res
//   })
// }
