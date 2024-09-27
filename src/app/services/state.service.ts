import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../components/interface/task.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }
}
