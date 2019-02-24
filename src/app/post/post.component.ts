import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccoutService } from '../accout.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
import { post } from 'selenium-webdriver/http';
import { Post } from '../post';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
posts:Post[];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    //private accountService:AccoutService,
    private http:HttpClient,
    private titleService:Title
  ) { 
    this.titleService.setTitle('Post');
  }

  ngOnInit() {
    const $obj =this.http.get('https://jsonplaceholder.typicode.com/posts')
    $obj.subscribe({next:(response:any[])=>{
      this.posts = response.slice(0,5).map((res)=>{
        return new Post(res.id,res.title,res.body);

      }
      );
    }
  });
    this.form = this.fb.group({title:[''],body:[''],id:['']})
  }

  onSubmit(form:FormGroup){
   const value = form.value;
   if(value.id){
    const obj$ =this.http.put('https://jsonplaceholder.typicode.com/posts/'+value.id,value)
    obj$.subscribe({next:(response: any) =>{ 
      console.log(response)
      const post = new Post(response.id, response.title, response.body);
      const index = this.posts.findIndex((p) =>{return p.id === post.id});
      console.log(index);
      this.posts[index] = post;
      }
    }) 
   }else{
    const obj$ =this.http.post('https://jsonplaceholder.typicode.com/posts',value)
    obj$.subscribe({next: (response: any) =>{
      console.log(response)
       const post = new Post(response.id, response.title, response.body);
       this.posts = [post,...this.posts];
       this.form.reset();
       }
     })
   }
  }

  onClick(post:Post){
    this.form.patchValue({id:post.id,title:post.title,body:post.body});
  }
  
  onDelete(post:Post){
    const con = confirm('Are you sure');
    if(con){
      const obj$ =this.http.delete('https://jsonplaceholder.typicode.com/posts/'+post.id)
      obj$.subscribe({next:()=>{const index = this.posts.findIndex((p) =>{return p.id === post.id});
      this.posts.splice(index,1);
      }
      })
    }
  }
}