import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Todo} from '../todo';
import { DisplayService }  from '../display.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.css']
})
export class DescComponent implements OnInit {
  
  todo:Todo;
  constructor(private route: ActivatedRoute,
    private displayService: DisplayService,
    private location: Location) {}

  ngOnInit():void 
  { 
    this.getTodo();
  }
  getTodo():void
  {
   const id =this.route.snapshot.paramMap.get('id');
   this.displayService.getTodo(id).subscribe(todos=>{
      this.todo=todos['todos'];
      });
  }
  Save(newdesc):void
  {
    this.todo.description=newdesc;
    this.displayService.updateItem(this.todo).subscribe(()=>this.goback());
  }
  goback():void
  { 
    this.location.back();
  }

}

