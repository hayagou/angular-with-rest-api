import { MyinfoService } from './../../../service/rest-api/myinfo.service';
import { Component} from '@angular/core';
import { User } from 'src/app/model/myinfo/User';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css']
})
export class MyinfoComponent {

  loginUser: User;

  constructor(private myInfoService: MyinfoService) { 
    this.myInfoService.getUser().then(user =>{
      this.loginUser = user;
    });
  }



}
