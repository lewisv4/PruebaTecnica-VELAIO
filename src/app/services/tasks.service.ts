import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../components/interface/task.model'; 
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private cacheKey = 'tasks';
  
  constructor(private cacheService: CacheService) { }

  // Obtener todas las tareas (si hay cache, retornarlo)
  getAllTasks(): Observable<Task[]> {
    const cachedTasks = this.cacheService.getItem(this.cacheKey);
    if (cachedTasks) {
      return of(cachedTasks);
    }

    // Simular una petición HTTP y guardar en caché
    const tasks: Task[] = [];  // Datos simulados
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }

  // Crear una nueva tarea
  createTask(task: Task): Observable<Task[]> {
    const tasks = this.cacheService.getItem(this.cacheKey) || [];
    tasks.push(task);
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }

  // Actualizar una tarea
  updateTask(updatedTask: Task): Observable<Task[]> {
    let tasks = this.cacheService.getItem(this.cacheKey) || [];
    tasks = tasks.map((task: Task) => task.userId === updatedTask.userId ? updatedTask : task);
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }

  // Eliminar una tarea
  deleteTask(userId: number): Observable<Task[]> {
    let tasks = this.cacheService.getItem(this.cacheKey) || [];
    
    // Aquí especificamos que `task` es de tipo `Task`
    tasks = tasks.filter((task: Task) => task.userId !== userId);
    
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }
}
