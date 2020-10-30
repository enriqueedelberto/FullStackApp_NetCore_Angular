import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/model/StudentModel';
import { ShowMessagesService } from 'src/app/show-messages.service';
import { AppService } from '../../app-services.service';
import { StudentFilter } from '../../model/StudentFilterModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public filterForm: FormGroup;
  public columnsTable: string[] = [
    'select',
    'Id',
    'Username',
    'Firstname',
    'Lastname',
    'Age',
    'Career',
  ];
  public dataStudents: Array<Student> = [];
  public selection = new SelectionModel<Student>(false, []);

  private NUMBER_PATTERN = `^[0-9]*$`;
  public MAX_LENGTH_ID = 100;
  constructor(private formBuilder: FormBuilder,
              private showMessage: ShowMessagesService,
              private router: Router,
              private appService: AppService) {

    this.buildForm();
  }

  ngOnInit() {
    this.dataStudents = [];
  }


  buildForm() {
    this.filterForm = this.formBuilder.group({
      Id: new FormControl('', [Validators.pattern(this.NUMBER_PATTERN), Validators.maxLength(100)])
    });
  }

  getStudents() {

    if (this.filterForm.invalid) {
      this.showMessage.showMessage('Debe verificar los campos señalados', 'Aceptar');
      return;
    }


    const Id = this.filterForm.get('Id').value;
    if (Id) {
      this.appService.getStudentDetail(Id).subscribe(res => {
        this.dataStudents = [res];
      }, error => {
        this.showMessage.showMessage(error, 'Aceptar');
      });
    }

    this.appService.getStudents().subscribe(res => {
      this.dataStudents = res;
    }, error => {
      this.showMessage.showMessage(error, 'Aceptar');
    });
  }

  clear() {
    this.filterForm.get('Id').setValue('');
  }

  goToDetail(Id: number) {
    this.router.navigate(['/student/detail', Id]);
  }

  create() {
    this.router.navigate(['/student/new']);
  }

  delete() {

  }

}
