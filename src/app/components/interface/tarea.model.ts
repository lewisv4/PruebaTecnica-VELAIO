// tarea.model.ts
export interface Persona {
    nombreCompleto: string;
  edad: number | null;
  }
  
  export interface Habilidad {
    nombre: string;
  }
  
  export interface Tarea {
    id?: number;
    nombre: string;
    fechaLimite: Date;
    personas: Persona[];
    habilidades: Habilidad[];
  }
  