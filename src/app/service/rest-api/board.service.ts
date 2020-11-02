import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';
import { HttpClient } from '@angular/common/http';
import { ApiValidationService } from './common/api-validation.service';
import { Injectable } from '@angular/core';
import { Post } from "src/app/model/board/Post";
import { ApiResponseList } from "src/app/model/common/ApiResponseList";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient, private apiValidationService: ApiValidationService) { }

  private getBoardUrl = '/api/v1/board'

  getPosts(boardName: string): Promise<Post[]>{
    const getPostsUrl = this.getBoardUrl + '/' + boardName + '/posts';
    return this.http.get<ApiValidationService>(getPostsUrl)
    .toPromise()
    .then(this.apiValidationService.validateResponse)
    .then(Response => {
      return Response.list as Post[];
    }).catch(Response => {
      alert('[게시판 조회 중 오류 발생]\n' + Response.console.error.msg);
      return Promise.reject(Response.error.msg);
    });
  }

  // 게시글 작성
  addPost(boardName: string, author: string, title: string, content: string): Promise<Post>{
    const postUrl = this.getBoardUrl+'/'+boardName;
    const params = new FormData();
    params.append('author', author);
    params.append('title', title);
    params.append('content', content);
    return this.http.post<ApiResponseSingle>(postUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(Response =>{
        return Response.data as Post;
      })
      .catch(Response =>{
        alert('[게시글 등록 중 오류 발생]\n'+ Response.error.msg);
        return Promise.reject(Response.error.msg);
      })
  }

  // 게시글 상세 내용 조회
  viewPost(postId: number): Promise<Post> {
    const postUrl = this.getBoardUrl + '/post/' + postId;

    return this.http.get<ApiResponseSingle>(postUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(Response => {
        return Response.data as Post;
      })
      .catch(Response => {
        alert('[게시글 조회 중 오류 발생]\n' + Response.error.msg);
        return Promise.reject(Response.error.msg);
      })
  }

  // 게시글 수정
  modifyPost(post: Post): Promise<Post> {
    const postUrl = this.getBoardUrl+ '/post/' + post.postId;
    const params = new FormData();
    params.append('author', post.author);
    params.append('title', post.title);
    params.append('content', post.content);
    return this.http.put<ApiResponseSingle>(postUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(Response =>{
        return Response.data as Post;
      })
      .catch(Response => {
        alert('[게시글 수정 중 오류 발생]\n' + Response.error.msg);
        return Promise.reject(Response.error.msg);
      });
  }

  // 게시글 삭제
  deletePost(postId: number): Promise<boolean> {
    const deletePostUrl = this.getBoardUrl + '/post/' + postId;
    return this.http.delete<ApiResponseSingle>(deletePostUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(Response =>{
        return true;
      })
      .catch(Response => {
        alert('[게시글 삭제 중 오류 발생]\n' + Response.error.msg);
        return Promise.reject(Response.error.msg);
      });
  }
}
