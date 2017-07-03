import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'task-detail',
  providers: [TaskService],
  template: `
  <div *ngIf="task">
    <h2>Details</h2>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Titel</span>
        <input [(ngModel)]="task.title" type="input" class="form-control" placeholder="Title">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Description</span>
        <input [(ngModel)]="task.description" type="input" class="form-control" placeholder="Description">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">DueDate</span>
        <input [(ngModel)]="task.duedate" type="input" class="form-control" placeholder="DueDate">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Priority</span>
        <input [(ngModel)]="task.priority" type="number" class="form-control" placeholder="Priority">
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox">
        <label>
          <input [checked]="!task.status" (change)="task.status = !task.status" type="checkbox"> Close Task
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" (click)="save()">Save Changes</button>
    <button type="submit" class="btn btn-danger" (click)="delete()">Delete Task</button>
  </div>
  `
})
export class TaskDetailComponent {
  @Input() task: Task;
  @Output()  deleted:EventEmitter<number> = new EventEmitter();
  @Output()  updated:EventEmitter<string> = new EventEmitter();

  constructor(private taskService: TaskService) { }

  save(): void {
    this.taskService.update(this.task)
    .then(() => this.updated.emit("updated"));;
  }

  delete(): void {
    this.taskService.delete(this.task.id)
    .then(() => this.deleted.emit(this.task.id));
  }
}
