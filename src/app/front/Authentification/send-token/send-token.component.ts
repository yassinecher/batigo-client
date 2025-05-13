import { Component } from '@angular/core';
import { AuthenticationService } from '../../data-access/authentication.service';

@Component({
  selector: 'app-send-token',
  templateUrl: './send-token.component.html',
  styleUrls: ['./send-token.component.scss']
})
export class SendTokenComponent {
message: any;
constructor(private auth:AuthenticationService){}
sendmail() {
  this.message='sending'

  this.auth.sendReToken(this.email).subscribe((res:any)=>{
    this.message=res.message
  })
}
email: any="";

}
