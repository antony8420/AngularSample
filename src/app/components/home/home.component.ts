import { Component } from '@angular/core';
import { StudentsListComponent } from '../students-list/students-list.component';

@Component({
  selector: 'app-home',
  imports: [StudentsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
