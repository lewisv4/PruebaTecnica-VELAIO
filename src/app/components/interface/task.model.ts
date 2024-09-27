
import { Person } from './person.model';
import { Skill } from './skill.model';
export interface Task {
    id?: number;
    persona: Person;
    titulo: string;
    fechaCreacion: Date;
    completada: boolean;
    habilidades: Skill[];
  
      
}

  
