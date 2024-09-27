
import { Person } from './person.model';

export interface Task {
        id?: number;
        title: string;
        completed: boolean;
        userId: number;
        people?: string;
        createdAt?: Date; // Agregar el campo de fecha de creación
      
      
}

  
