import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import * as uuid from 'uuid/v4';
import { Observable } from 'rxjs';
import { $ } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  
  private baseUrl='http://localhost:5000/api/v1/todos';
  todos:Todo[]=[];
   todo:Todo; 

   constructor(private http:HttpClient) { }

   getTodos():Observable<Todo[]>{
     return this.http.get<Todo[]>(this.baseUrl);
   }
  
   addItem(newTodoText: string):Observable<Todo> {
    
    this.todo={
      _id: uuid(),
      text: newTodoText,
      isCompleted: false,
      description:'abcd'
    }
      return this.http.post<Todo>(this.baseUrl,this.todo,httpOptions);
  }
  
  deleteItem(todo: Todo):Observable<Todo>{
    return this.http.delete<Todo>(`${this.baseUrl}/${todo._id}`,httpOptions);
}

  updateItem(todo:Todo):Observable<any>{
      return this.http.put(`${this.baseUrl}/${todo._id}`,todo,httpOptions);
  }

  getTodo(id:string):Observable<Todo[]>{   
        return this.http.get<Todo[]>(`${this.baseUrl}/${id}`);
  }
}

