
import { Person } from './person.model';

export interface Task {
    id?: number;
    userId: number;
    title: string;
    completed: boolean;
    people: Person[]; 
}

  
