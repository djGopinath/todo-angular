import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiEndpoint = 'http://localhost:8080/api/task';

  constructor(private http: HttpClient) { }

  postTask(payload: Task): Observable<Task> {
    return this.http.post<Task>(this.apiEndpoint, payload)
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiEndpoint)
  }

  updateTask(taskId:number,payload: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiEndpoint}/${taskId}`,payload);
  }

  deleteTask(taskId:number) {
    return this.http.delete<Task>(`${this.apiEndpoint}/${taskId}`);
  }
} 
