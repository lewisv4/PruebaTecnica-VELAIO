import { Skill } from "./skill.model";

export interface Person {
  id?: number;
  fullName: string;  // Nombre completo de la persona
  age: number | null;       // Edad de la persona
  skills: Skill[];  // Arreglo de habilidades de la persona
}
