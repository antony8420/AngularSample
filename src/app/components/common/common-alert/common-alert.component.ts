import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-common-alert',
  imports: [],
  templateUrl: './common-alert.component.html',
  styleUrl: './common-alert.component.css'
})
export class CommonAlertComponent {
 @Input() showalert: boolean = false;
 @Input() alertMessage: string = '';

  message: boolean = false;

  hideeMessage(){
      this.message = false
  }
}
