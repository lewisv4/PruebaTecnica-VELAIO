import { Component } from '@angular/core';
import { Tarea } from '../../interface/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent {
  tarea: Tarea = { nombre: '', fechaLimite: new Date(), personas: [], habilidades: [] };
  tareas: Tarea[] = [];
  constructor(private tareaService: TareaService) {}

  ngOnInit() {
    this.tareas = this.tareaService.obtenerTareas();
    console.log("tarea", this.tarea);
    console.log("tareas", this.tareas);
  }
  guardarTarea() {
    this.tareaService.crearTarea(this.tarea);
    this.tarea = { nombre: '', fechaLimite: new Date(), personas: [], habilidades: [] }; // Reiniciar el formulario
  }
  eliminarTarea(id: number) {
    this.tareaService.eliminarTarea(id);
    this.tareas = this.tareaService.obtenerTareas(); // Actualizar la lista
  }
}
