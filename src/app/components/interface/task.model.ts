// models/task.model.ts
export interface Task {
    userId: number;
    title: string;
    completed: boolean;
    people: Person[];
  }
  
  // models/person.model.ts
export interface Person {
    fullName: string;
    age: number;
    skills: string[];
  }