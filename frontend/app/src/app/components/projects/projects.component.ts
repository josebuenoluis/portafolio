import { Component,ViewChild,ElementRef } from '@angular/core';
import { Tecnologia } from '../../interfaces/tecnologia';
import { Project } from '../../interfaces/project';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  tecnologias: Tecnologia[] = [];
  proyectos : Project[] = [];
  @ViewChild("seccionProyectos") seccionProyectos!: ElementRef;

  ngAfterViewInit() {
    
    this.getProjects().then(data => {
      console.log(data);
    });
    this.getTechnologies().then(data => {
      console.log("Tecnologias: ",data);
    });
  }


  mostrarProyectos(){
    let seccion = this.seccionProyectos.nativeElement as HTMLElement;
    
  }

  async getProjects(){
    let endpoint = "https://josebuenoluis.com/api/proyectos";
    return fetch(endpoint,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(data => {
      return data.json();
    }).catch(error => {
      console.log("Error: ",error);
      return {};
    });
  }

  async getTechnologies(){
    let endpoint = "https://josebuenoluis.com/api/tecnologia";
    return fetch(endpoint,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(data => {
      return data.json();
    }).catch(error => {
      console.log("Error: ",error);
      return {};
    });
  }

}
