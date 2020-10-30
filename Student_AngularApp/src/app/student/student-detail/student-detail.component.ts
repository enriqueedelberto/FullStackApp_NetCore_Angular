import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app-services.service';
import { Student } from 'src/app/model/StudentModel';
import { ShowMessagesService } from 'src/app/show-messages.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  public detailForm: FormGroup;
  private NUMBER_PATTERN = `^[0-9]*$`;
  public MAX_LENGTH_WORDS = 200;
  public MAX_LENGTH_ID = 100;
  public idStudent: string;
  public readOnly: boolean;
  public disabled = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private showMessage: ShowMessagesService,
              private activatedRouter: ActivatedRoute,
              private appService: AppService) {

                this.buildForm();
              }

  ngOnInit() {
    this.getDetail();
    this.readOnly = true;
  }


  buildForm() {
    this.detailForm = this.formBuilder.group({
      Id: new FormControl('', [Validators.pattern(this.NUMBER_PATTERN), Validators.maxLength(this.MAX_LENGTH_ID)]),
      Username: new FormControl('', [Validators.maxLength(this.MAX_LENGTH_WORDS)]),
      Firstname: new FormControl('', [Validators.maxLength(this.MAX_LENGTH_WORDS)]),
      Lastname: new FormControl('', [Validators.maxLength(this.MAX_LENGTH_WORDS)]),
      Age: new FormControl('', [Validators.pattern(this.NUMBER_PATTERN), Validators.maxLength(4)]),
      Career: new FormControl('', [Validators.maxLength(this.MAX_LENGTH_WORDS)]),
    });
  }

  getDetail() {
    this.activatedRouter.params.subscribe(
      (params: any) => {
        if (!params.id) {
          return;
         }

        this.idStudent = params.id;


        this.appService.getStudentDetail(this.idStudent).subscribe(res => {

          this.detailForm.get('Id').setValue(res.id);
          this.detailForm.get('Username').setValue(res.username);
          this.detailForm.get('Firstname').setValue(res.firstName);
          this.detailForm.get('Lastname').setValue(res.lastName);
          this.detailForm.get('Age').setValue(res.age);
          this.detailForm.get('Career').setValue(res.career);
        });

        this.detailForm.get('Id').disable();

      });

  }

  save() {
    if (this.detailForm.invalid) {
      this.showMessage.showMessage('Please, verify the fields', 'Ok');
      return;
    }


    const studentToSave: Student = {
      id: this.detailForm.get('Id').value,
      username: this.detailForm.get('Username').value,
      firstName: this.detailForm.get('Firstname').value,
      lastName: this.detailForm.get('Lastname').value,
      age: this.detailForm.get('Age').value,
      career: this.detailForm.get('Career').value,

    };

    this.detailForm.disable();

    this.disabled = true;

    if (this.idStudent) {
      this.appService.updateStudent(this.idStudent, studentToSave).subscribe(
        res => {

          this.showMessage.showMessage(`Student ${this.idStudent} was updated.`, 'Aceptar');
          this.router.navigate(['/student/list']);

        }, error => {
          this.disabled = false;
          this.detailForm.enable();
          this.showMessage.showMessage(error.message, 'Aceptar');
         });

      return;
    }


    this.appService.saveStudent(  studentToSave).subscribe(
      res => {
        this.showMessage.showMessage(`Student ${studentToSave.id} was saved.`, 'Ok');
        this.router.navigate(['/student/list']);
      }, error => {
        this.disabled = false;
        this.detailForm.enable();
        this.showMessage.showMessage(error.message, 'Ok');
       });


  }


  cancel() {
    this.router.navigate(['/student/list']);
  }

}
