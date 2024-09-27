import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../interface/task.model';
import { TaskService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  taskForm: FormGroup;
  tasks: Task[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [''],
      completed: [false],
      people: this.fb.array([]) // Array de personas
    });
  }
  triggerTaskFunction() {
    this.taskService.executeFunction();
    console.log("triggerTaskFunction inicio");
    this.loadTasks();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

}
