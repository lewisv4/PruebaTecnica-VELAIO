import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks.service'; 
import { PersonService } from 'src/app/services/person.service'; 
import { Task } from '../../interface/task.model'; 
import { Person } from '../../interface/person.model'; 

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  @Output() actionTriggered = new EventEmitter<void>();

  taskForm: FormGroup;
  tasks: Task[] = [];
  people$!: Observable<Person[]>; //almacenar personas
  isEditing = false;
  editingIndex: number | null = null;
  pe:any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private personService: PersonService,
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false],
      userId: [null,], // Campo para almacenar el ID de la persona
      people: [this.people$, Validators.required],
    });
  }


  ngOnInit(): void {
    this.people$ = this.personService.getAllPeople();
    this.loadTasks();
    // console.log(this.taskForm);
    // console.log(this.people$);
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit(): void {
  console.log(this.taskForm);
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.isEditing) {
        // Actualizar tarea
        this.taskService.updateTask({ ...task, userId: this.tasks[this.editingIndex!].userId }).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      } else {
        // Crear tarea
        this.taskService.createTask(task).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      }
    }
  }

  editTask(index: number): void {
    this.isEditing = true;
    this.editingIndex = index;
    const task = this.tasks[index];
    this.taskForm.patchValue({
      title: task.title,
      completed: task.completed,
      people: task.people // Asegúrate de incluir el ID de la persona
    });
  }

  deleteTask(index: number): void {
    const userId = this.tasks[index].userId;
    this.taskService.deleteTask(userId).subscribe(() => {
      this.loadTasks();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingIndex = null;
    this.taskForm.reset({ completed: false });
  }

  triggerAction() {
    this.actionTriggered.emit();
  }

  callServiceFunction() {
    this.taskService.executeFunction();
    console.log("callServiceFunction taskscomponent");
  }
}
