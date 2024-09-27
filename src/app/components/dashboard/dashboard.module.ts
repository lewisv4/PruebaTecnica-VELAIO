import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { ProductosComponent } from './productos/productos.component';
import { TasksComponent } from './tasks/tasks.component';
import { PeopleComponent } from './people/people.component';
import  {SkillComponent } from './skill/skill.component';
import { TareaComponent } from './tarea/tarea.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ProductosComponent,
    PeopleComponent,
    SkillComponent,
    TasksComponent,
    TareaComponent,
      
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    // TasksComponent
  ]
})
export class DashboardModule { }
