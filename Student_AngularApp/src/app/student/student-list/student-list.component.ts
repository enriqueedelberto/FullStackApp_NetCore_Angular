import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/model/StudentModel';
import { AppService } from '../../app-services.service';

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

  constructor(private formBuilder: FormBuilder,
              private appService: AppService) {

    this.buildForm();
  }

  ngOnInit() {
    this.dataStudents = [];
  }


  buildForm() {
    this.filterForm = this.formBuilder.group({
      Id: new FormControl('', [Validators.pattern(''), Validators.maxLength(100)]),
      Username: new FormControl('', [Validators.maxLength(200)])
    });
  }

  getStudents() {

  }

  clear() {

  }

  goToDetail(Id: string) {

  }

  create() {

  }

  delete() {

  }

}
