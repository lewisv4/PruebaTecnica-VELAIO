import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../components/interface/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(this.loadPeopleFromLocalStorage());
  private people: Person[] = this.peopleSubject.getValue(); // Almacena las personas en memoria

  constructor() {}

  // Cargar personas desde localStorage
  private loadPeopleFromLocalStorage(): Person[] {
    const peopleJson = localStorage.getItem('people');
    return peopleJson ? JSON.parse(peopleJson) : [];
  }

  // Guardar personas en localStorage
  private savePeopleToLocalStorage(): void {
    localStorage.setItem('people', JSON.stringify(this.people));
  }

  // Obtener todas las personas
  getAllPeople(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  // Agregar una nueva persona
  addPerson(person: Person): void {
    this.people.push(person);
    this.peopleSubject.next(this.people); // Actualiza el observable
    this.savePeopleToLocalStorage(); // Guarda en localStorage
  }

  // Actualizar una persona
  updatePerson(index: number, person: Person): void {
    if (index >= 0 && index < this.people.length) {
      this.people[index] = person;
      this.peopleSubject.next(this.people); // Actualiza el observable
      this.savePeopleToLocalStorage(); // Guarda en localStorage
    }
  }

  // Eliminar una persona
  deletePerson(index: number): void {
    if (index >= 0 && index < this.people.length) {
      this.people.splice(index, 1); // Elimina solo el elemento especificado
      this.peopleSubject.next(this.people); // Actualiza el observable
      this.savePeopleToLocalStorage(); // Guarda en localStorage
    }
  }
}
