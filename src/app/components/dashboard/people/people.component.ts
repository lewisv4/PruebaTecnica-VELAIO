import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../interface/person.model'; 
import { PersonService } from 'src/app/services/person.service';
import { Observable } from 'rxjs';
import { Skill } from '../../interface/skill.model';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  personForm: FormGroup;
  people: Person[] = [];
  skills$: Observable<Skill[]>; // Observable para las habilidades
  editIndex: number | null = null;

  constructor(private fb: FormBuilder, private personService: PersonService, private skillService: SkillService) {
    this.personForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      skills: [[], Validators.required] // El array de habilidades seleccionadas
    });

    // Inicializa el observable de habilidades
    this.skills$ = this.skillService.getAllSkills();
  }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.personService.getAllPeople().subscribe(people => {
      this.people = people;
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const person: Person = {
        ...this.personForm.value,
        skills: this.personForm.value.skills // Asegúrate de que estás capturando las habilidades correctamente
      };
  
      if (this.editIndex !== null) {
        this.personService.updatePerson(this.editIndex, person);
      } else {
        this.personService.addPerson(person);
      }
  
      this.loadPeople();
      this.resetForm();
    }
  }

  editPerson(index: number): void {
    const person = this.people[index];
    this.editIndex = index;
    this.personForm.patchValue({
      fullName: person.fullName,
      age: person.age,
      skills: person.skills
    });
    this.loadPeople();
    console.log("editPerson",index);
  }
  
  deletePerson(index: number): void {
    this.personService.deletePerson(index);
    this.loadPeople();
  }

  resetForm(): void {
    this.personForm.reset();
    this.editIndex = null;
  }
}
