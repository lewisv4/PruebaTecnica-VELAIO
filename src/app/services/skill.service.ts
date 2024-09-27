import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Skill } from '../components/interface/skill.model'; 

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private skillsSubject: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(this.loadSkillsFromLocalStorage());

  constructor() {}

  // Cargar habilidades desde localStorage
  private loadSkillsFromLocalStorage(): Skill[] {
    const skillsJson = localStorage.getItem('skills');
    return skillsJson ? JSON.parse(skillsJson) : [];
  }

  // Guardar habilidades en localStorage
  private saveSkillsToLocalStorage(skills: Skill[]): void {
    localStorage.setItem('skills', JSON.stringify(skills));
  }

  // Obtener todas las habilidades
  getAllSkills(): Observable<Skill[]> {
    return this.skillsSubject.asObservable();
  }

  // Agregar una nueva habilidad
  addSkill(skill: Skill): void {
    const currentSkills = this.skillsSubject.getValue();
    currentSkills.push(skill);
    this.skillsSubject.next(currentSkills); // Actualiza el observable
    this.saveSkillsToLocalStorage(currentSkills); // Guarda en localStorage
  }

  // Actualizar una habilidad
  updateSkill(index: number, skill: Skill): void {
    const currentSkills = this.skillsSubject.getValue();
    if (index >= 0 && index < currentSkills.length) {
      currentSkills[index] = skill;
      this.skillsSubject.next(currentSkills); // Actualiza el observable
      this.saveSkillsToLocalStorage(currentSkills); // Guarda en localStorage
    }
  }

  // Eliminar una habilidad
  deleteSkill(index: number): void {
    const currentSkills = this.skillsSubject.getValue();
    if (index >= 0 && index < currentSkills.length) {
      currentSkills.splice(index, 1); // Elimina solo el elemento especificado
      this.skillsSubject.next(currentSkills); // Actualiza el observable
      this.saveSkillsToLocalStorage(currentSkills); // Guarda en localStorage
    }
  }
}
