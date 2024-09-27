import { Component, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-people-form',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  // @Input() peopleFormArray: FormArray;

  // constructor(private fb: FormBuilder) {}

  // addPerson(): void {
  //   const personGroup = this.fb.group({
  //     fullName: ['', Validators.required],
  //     age: ['', [Validators.required, Validators.min(1)]],
  //     skills: this.fb.array([])
  //   });
  //   this.peopleFormArray.push(personGroup);
  // }

  // removePerson(index: number): void {
  //   this.peopleFormArray.removeAt(index);
  // }

  // addSkill(personIndex: number): void {
  //   const skillsArray = this.peopleFormArray.at(personIndex).get('skills') as FormArray;
  //   skillsArray.push(this.fb.control('', Validators.required));
  // }

  // removeSkill(personIndex: number, skillIndex: number): void {
  //   const skillsArray = this.peopleFormArray.at(personIndex).get('skills') as FormArray;
  //   skillsArray.removeAt(skillIndex);
  // }
}
