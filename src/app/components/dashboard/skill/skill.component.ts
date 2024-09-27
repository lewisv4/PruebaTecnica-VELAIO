import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../interface/skill.model';
import { SkillService } from 'src/app/services/skill.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skillForm: FormGroup;
  skills: Skill[] = [];
  dataSourceList: Skill[] = []; // Propiedad para la tabla
  editingIndex: number | null = null;
  

  constructor(private fb: FormBuilder, private skillService: SkillService) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSkills(); // Carga las habilidades al iniciar el componente
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe(skills => {
      this.skills = skills; // Almacena las habilidades en la propiedad `skills`
      this.dataSourceList = skills; // Asigna las habilidades a `dataSourceList`
    });
    console.log("loadSkills");
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const skill: Skill = {
        ...this.skillForm.value
      };

      if (this.editingIndex !== null) {
        this.skillService.updateSkill(this.editingIndex, skill);
        this.loadSkills();
      } else {
        this.skillService.addSkill(skill);
      }
      this.resetForm(); // Reiniciar el formulario
      this.loadSkills(); // Cargar las habilidades actualizadas
    }
  }

  editSkill(index: number): void {
    console.log("editSkill", index);
    const skill = this.skills[index];
    if (skill) {
      this.skillForm.patchValue({
        name: skill.name,
        level: skill.level,
      });
      this.editingIndex = index; // Establecer el índice de edición
      console.log("Skill cargada:", skill);
    } else {
      console.log("No se encontró la habilidad en el índice:", index);
    }
  }

  deleteSkill(index: number): void {
    this.skillService.deleteSkill(index);
    this.loadSkills(); // Carga las habilidades actualizadas
    console.log("deleteSkill",index);
  }

  resetForm(): void {
    this.skillForm.reset();
    this.editingIndex = null; // Reiniciar el índice de edición
  }

  trackByFn(index: number, item: Skill): number {
    return index; // o puedes usar un identificador único si está disponible
  }
}
