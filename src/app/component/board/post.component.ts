import { MyinfoService } from './../../service/rest-api/myinfo.service';
import { SignService } from 'src/app/service/rest-api/sign.service';
import { BoardService } from './../../service/rest-api/board.service';
import { MyinfoComponent } from './../member/myinfo/myinfo.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  boardName: string;
  postForm: FormGroup;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private signService: SignService,
    private myinfoService: MyinfoService,
    private boardService: BoardService
  ) { 
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    this.boardName = this.route.snapshot.params['boardName'];
  }

  get f(){
    return this.postForm.controls;
  }
  
  submit(){
    if(this.signService.isSignIn && this.postForm.valid){
      this.myinfoService.getUser().then( user=>{
        this.boardService.addPost(this.boardName, user.name, this.postForm.value.title, this.postForm.value.content)
        .then(Response => {
          this.router.navigate(['/board/' + this.boardName]);
        });
      });
    }
    
  }

}
