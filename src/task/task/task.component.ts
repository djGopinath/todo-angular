import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Task } from '../../interface/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  public newTask: Task = { description: "", completed: false };
  public tasks: Task[] = [];
  public editingTask: Task | null = null;
  public updatedTask: Task = { description: "", completed: false };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  public addTask(): void {
    this.taskService.postTask(this.newTask).subscribe((task: Task) => {
      this.newTask = { description: "", completed: false };
      this.getAllTasks();
    })
  }

  public getAllTasks() {
    this.taskService.getAllTask().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  public editTask(task: Task) {
    this.editingTask = task;
    this.updatedTask = { ...task };
  }

  public updateTaskDetails():void {
    if (this.editingTask)
      this.taskService.updateTask(this.editingTask.id!, this.updatedTask).subscribe((result) => {
        const index = this.tasks.findIndex((task) => {
          task.id === this.editingTask!.id;
          if (index !== -1) {
            this.tasks[index] = result;
            this.cancelEdit();
          }
        });
      });
  }

  public deleteTask(taskId: any) {
    if (confirm('Are you sure you want to delete this task'))
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        if (this.editingTask && this.editingTask.id == taskId) {
          this.cancelEdit();
        }
      });
  }


  public cancelEdit() {
    this.editingTask = null;
    this.updatedTask = { description: "", completed: false };
  }
}
