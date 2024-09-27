import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../components/interface/task.model'; 
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private cacheKey = 'tasks';
  private currentId = 1; // Contador para ID autoincrementable

  constructor(private cacheService: CacheService) {}

  // Método para ejecutar una función
  executeFunction() {
    console.log('Función ejecutada desde TaskService');
    console.log("testo");
  }

  getAllTasks(): Observable<Task[]> {
    const cachedTasks = this.cacheService.getItem(this.cacheKey);
    if (cachedTasks) {
      return of(cachedTasks);
    }

    const tasks: Task[] = []; // Datos simulados
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }

  // Crear una nueva tarea
  createTask(task: Task): Observable<Task[]> {
    const tasks = this.cacheService.getItem(this.cacheKey) || [];
    task.id = this.currentId++; // Asigna un ID autoincrementable
    tasks.push(task);
    this.cacheService.setItem(this.cacheKey, tasks);
    return of(tasks);
  }

  // Actualizar una tarea
  updateTask(updatedTask: Task): Observable<Task[]> {
    let tasks = this.cacheService.getItem(this.cacheKey) || [];
    tasks = tasks.map((task: Task) => (task.userId === updatedTask.userId ? updatedTask : task));
    this.cacheService.setItem(this.cacheKey, tasks); // Guarda en caché
    return of(tasks);
  }

  // Eliminar una tarea
  deleteTask(userId: number): Observable<Task[]> {
    let tasks = this.cacheService.getItem(this.cacheKey) || [];
    
    // Filtrar la tarea especificada
    tasks = tasks.filter((task: Task) => task.userId !== userId);
    
    this.cacheService.setItem(this.cacheKey, tasks); // Guarda en caché
    return of(tasks);
  }
}
