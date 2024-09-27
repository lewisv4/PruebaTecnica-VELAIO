import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/tasks.service';
import { PersonService } from 'src/app/services/person.service';
import { Task } from '../../interface/task.model';
import { Person } from '../../interface/person.model';
import { Skill } from '../../interface/skill.model';
import { SkillService } from 'src/app/services/skill.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  tareas: Task[] = [];
  personas$!: Observable<Person[]>;
  skills$!: Observable<Skill[]>; // Observable para las habilidades
  tareaForm: FormGroup;
  editIndex: number | null = null;
  
  constructor(private fb: FormBuilder, private personService: PersonService, private skillService: SkillService) {
    this.tareaForm = this.fb.group({
      persona: [''],
      titulo: [''],
      fechaCreacion: [new Date()],
      completada: [false],
      habilidades: [''],
    });
  }

  ngOnInit(): void {
    // Cargar las tareas si ya existen en localStorage
    this.cargarTareasDesdeLocalStorage();
    console.log
    // Inicializa el observable de habilidades
    this.personas$ = this.personService.getAllPeople();
    this.skills$ = this.skillService.getAllSkills();
  }

  

  agregarTarea() {
    if (this.tareaForm.valid) {
      const nuevaTarea = this.tareaForm.value as Task;
      nuevaTarea.id = this.tareas.length + 1; // O generar un ID único si es necesario
      
      if (this.editIndex !== null) {
        // Actualizar tarea existente
        this.tareas[this.editIndex] = nuevaTarea;
        this.editIndex = null; // Reiniciar el índice de edición
      } else {
        // Agregar nueva tarea
        this.tareas.push(nuevaTarea);
      }
  
      this.guardarTareasEnLocalStorage(); // Guardar tareas en localStorage
      this.tareaForm.reset(); // Reiniciar el formulario
    } else {
      console.log('Formulario inválido', this.tareaForm);
    }
    this.cargarTareasDesdeLocalStorage();
  }
  


  editarTarea(index: number) {
    console.log(index, "editar");
    const tareaParaEditar = this.tareas[index];
    
    if (tareaParaEditar) {
      this.tareaForm.patchValue({
        persona: tareaParaEditar.persona,  // Asignar la persona actual
        titulo: tareaParaEditar.titulo,    // Asignar el título actual
        fechaCreacion: tareaParaEditar.fechaCreacion, // Asignar la fecha actual
        completada: tareaParaEditar.completada, // Asignar el estado de completada
        habilidades: tareaParaEditar.habilidades, // Asignar habilidades actuales
      });
      
      this.editIndex = index; // Establecer el índice de edición
      console.log("tareaForm cargada:", tareaParaEditar);
    } else {
      console.log("No se encontró la tarea en el índice:", index);
    }
  }
  




  test(i:any){
  
    console.log("estoy en test", i);
  }
  

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1); // Eliminar la tarea del array
    this.guardarTareasEnLocalStorage(); // Actualizar el localStorage
  }
  resetForm(): void {
    this.tareaForm.reset();
    this.editIndex = null;
  }

  private guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  private cargarTareasDesdeLocalStorage() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
    console.log("tareasGuardadas",tareasGuardadas);
  }
}