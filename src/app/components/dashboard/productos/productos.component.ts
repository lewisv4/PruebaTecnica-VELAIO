import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  tareas: any;


  constructor(private http: HttpClient) { }
  columnas: string[] = ['userId', 'id', 'title', 'completed'];

  ngOnInit() {
    this.http.get('/assets/js/datos.json').subscribe(data => {
      this.tareas = data;
      console.log(this.tareas);
    });

    this.tareas.forEach(() => {
      console.log(this.tareas.data);
    });

  }



}
