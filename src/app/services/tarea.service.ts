// tarea.service.ts
import { Injectable } from '@angular/core';
import { Tarea } from '../components/interface/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];
  private idCounter = 0;

  crearTarea(tarea: Tarea): Tarea {
    tarea.id = this.idCounter++;
    this.tareas.push(tarea);
    return tarea;
  }

  obtenerTareas(): Tarea[] {
    return this.tareas;
  }

  actualizarTarea(tarea: Tarea): Tarea | undefined {
    const index = this.tareas.findIndex(t => t.id === tarea.id);
    if (index !== -1) {
      this.tareas[index] = tarea;
      return tarea;
    }
    return undefined;
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
  }
}
