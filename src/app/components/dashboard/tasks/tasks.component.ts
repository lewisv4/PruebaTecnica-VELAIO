import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/tasks.service';
import { Task } from '../../interface/task.model'; 

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    taskForm: FormGroup;
    tasks: Task[] = [];
  
    constructor(private fb: FormBuilder, private taskService: TaskService) {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        completed: [false],
      });
    }
  
    ngOnInit(): void {
      this.loadTasks();
    }
  
    loadTasks(): void {
      this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        console.log("loadTasks", tasks);
      });
    }
  
    onSubmit(): void {
      if (this.taskForm.valid) {
        this.taskService.createTask(this.taskForm.value).subscribe(() => {
          this.taskForm.reset();
          this.loadTasks();
          console.log("this.taskForm.value", this.taskForm.value);
        });
      }
    }
  }
  

