import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

@Component({
  selector: 'app-root',
  providers: [TaskService],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Tasks';
  tasks: Task[];
  selectedTask: Task;
  isRefreshing: Boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.refresh();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .then(tasks => {
        this.tasks = this.sortTasks(tasks);
        this.isRefreshing = false
      });
  }

  sortTasks(tasks): any {
    return tasks.sort(
      (a,b) => {
        let aDueDate = new Date(a.duedate).getTime();
        let bDueDate = new Date(b.duedate).getTime();
        return b.status - a.status || b.priority - a.priority || aDueDate - bDueDate;
      }
    );
  }

  updated(): void {
    this.tasks = this.sortTasks(this.tasks);
  }

  deleted(id): void {
    console.log(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.selectedTask.id === id) { this.selectedTask = null; }
  }

  deleteAll(): void {
    if (window.confirm("Do you really want to delete all tasks?")) {
      this.taskService.deleteAll()
        .then(() => {
          this.tasks = null;
          this.selectedTask = null;
        });
    }
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  refresh(): void {
    this.getTasks();
    this.isRefreshing = true;
    this.selectedTask = null;
  }

  convertDate(dateString): any {
    let date = new Date(dateString);
    return `${this.pad(date.getDate())}.${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }

  pad(n): any {
    return n<10 ? '0'+n : n
  }
}
