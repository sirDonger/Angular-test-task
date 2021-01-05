import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {

  newData:Array<object>;
  toDoList:any;
  toDoListFiltered:any;
  newTask: string;

  constructor(private fetchService: FetchDataService) { }

  ngOnInit(): void {
    this.getAll();
  }

  isChecked(i): void{
    this.toDoList[i].completed = !this.toDoList[i].completed;
  }

  addPost(): void{
    
    let newItem = {
      userId: 1,
      id: this.toDoList.length + 1,
      title: this.newTask,
      completed: false
    };
    this.toDoList.push(newItem);
    this.newTask = '';
  }

  deletePost(i): void{
    this.toDoList.splice(i, 1)
  }
  getAll(): void{
    this.fetchService.getData()
        .subscribe((data) => this.toDoList = data);
    this.toDoListFiltered = null;
  }
  getSelected(): void{
    this.toDoListFiltered = null;
    this.toDoListFiltered = this.toDoList.filter(item => item.completed);
  }
  getUnSelected(): void{
    this.toDoListFiltered = null;
    this.toDoListFiltered = this.toDoList.filter(item => !item.completed)
  }
}
