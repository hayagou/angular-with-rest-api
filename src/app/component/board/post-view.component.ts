import { MyinfoService } from './../../service/rest-api/myinfo.service';
import { SignService } from 'src/app/service/rest-api/sign.service';
import { BoardService } from './../../service/rest-api/board.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/board/Post';
import { User } from 'src/app/model/myinfo/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  loginUser: User;
  boardName: string;
  postId: number;
  post: Post;

  constructor(private route: ActivatedRoute,
    private boardService: BoardService,
    public signService: SignService,
    private myinfoService: MyinfoService) { 
      this.boardName = this.route.snapshot.params['boardName'];
      this.postId = this.route.snapshot.params['postId'];
    }

  ngOnInit(): void {
    if(this.signService.isSignIn()){
      this.myinfoService.getUser()
      .then(user => {
        this.loginUser = user;
      });
    }
    this.boardService.viewPost(this.postId)
    .then(post => {
      this.post = post;
    });
  }

}
