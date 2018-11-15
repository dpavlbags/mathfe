import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ag-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  beURL = environment.apiURL + '/';
  @Input() selectedCourse: Course;
  constructor() { }

  ngOnInit() {
  }

}
