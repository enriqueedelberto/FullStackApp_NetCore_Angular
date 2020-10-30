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
  public Id_Student: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private showMessage: ShowMessagesService,
              private activatedRouter: ActivatedRoute,
              private appService: AppService) {

                this.buildForm();
              }

  ngOnInit() {
    this.getDetail();
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

        this.Id_Student = params.id;


        this.appService.getStudentDetail(this.Id_Student).subscribe(res => {

          this.detailForm.get('Id').setValue(res.Id);
          this.detailForm.get('Username').setValue(res.Username);
          this.detailForm.get('Firstname').setValue(res.FirstName);
          this.detailForm.get('Lastname').setValue(res.LastName);
          this.detailForm.get('Age').setValue(res.Age);
          this.detailForm.get('Career').setValue(res.Career);
        });

      });

  }

  save() {
    if (this.detailForm.invalid) {
      this.showMessage.showMessage('Debe verificar los campos señalados', 'Aceptar');
      return;
    }


    let studentToSave: Student = {
      Id: this.detailForm.get('Id').value,
      Username: this.detailForm.get('Username').value,
      FirstName: this.detailForm.get('Firstname').value,
      LastName: this.detailForm.get('Lastname').value,
      Age: this.detailForm.get('Age').value,
      Career: this.detailForm.get('Career').value,

    };

    //When everything is OK, redirect
    this.router.navigate(['/student/list']);
  }


  cancel() {
    this.router.navigate(['/student/list']);
  }

}
