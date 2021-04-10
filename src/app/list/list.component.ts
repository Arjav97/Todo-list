import { Component } from '@angular/core';
import { Todo } from '../todo';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  todos: Array<Todo>=[];
  newTodoText: string = "";

  constructor(private displayService: DisplayService) {
    this.displayService.getTodos().subscribe(todos=>{
    this.todos=todos['todos'];
    });
  }

   addItem() {
    this.displayService.addItem(this.newTodoText).subscribe(todos => {
    this.todos.push(todos['todos']);
    });
    this.newTodoText = undefined;
  }

  updateCheckbox(todo:Todo){
    this.displayService.updateItem(todo).subscribe();
  }

  deleteItem(todo: Todo) {
    this.todos=this.todos.filter(t =>t!==todo);
   this.displayService.deleteItem(todo).subscribe();

  }
  
}
