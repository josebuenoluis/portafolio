import { Component, ViewChild, ElementRef } from '@angular/core';
import { Tecnologia } from '../../interfaces/tecnologia';
import { Project } from '../../interfaces/project';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  tecnologias: Tecnologia[] = [];
  proyectos: Project[] = [];
  @ViewChild('seccionProyectos') seccionProyectos!: ElementRef;

  async ngOnInit() {
    this.proyectos = await this.getProjects();
    this.tecnologias = await this.getTechnologies();
  }
  mostrarProyectos() {
    this.proyectos.forEach((proyecto: Project) => {
      debugger;
      let article = document.createElement('article');
      article.classList.add('project-box');
      let imgDiv = document.createElement('div');
      imgDiv.classList.add('img-project');
      let img = document.createElement('img');
      img.src = proyecto.image;
      img.alt = `Imagen del proyecto ${proyecto.title}`;
      imgDiv.appendChild(img);
      let textDiv = document.createElement('div');
      textDiv.classList.add('text-info');
      let title = document.createElement('h3');
      title.textContent = proyecto.title;
      let description = document.createElement('p');
      description.textContent = proyecto.description;
      let link = document.createElement('a');
      link.href = proyecto.url;
      link.textContent = 'Ver Proyecto';
      link.target = '_blank';
      textDiv.appendChild(link);
      textDiv.appendChild(title);
      textDiv.appendChild(description);
      let tecnologiasDiv = document.createElement('div');
      tecnologiasDiv.classList.add('tecnologies-box');
      proyecto.tecnologias_fk.forEach((id_tecnologia: number) => {
        let tecnologia = this.tecnologias.find((t) => t.id === id_tecnologia);
        if (tecnologia) {
          let tecnologiaContent = document.createElement('div');
          tecnologiaContent.classList.add('tecnologie-content');
          let p = document.createElement('p');
          p.textContent = tecnologia.nombre;
          tecnologiaContent.appendChild(p);
          tecnologiasDiv.appendChild(tecnologiaContent);
        }
      });
      article.appendChild(imgDiv);
      article.appendChild(textDiv);
      article.appendChild(tecnologiasDiv);
      this.seccionProyectos.nativeElement.appendChild(article);
    });
  }
  obtenerNombreTecnologia(id:number) {
    const tecnologia = this.tecnologias.find(t => t.id === id);
    return tecnologia ? tecnologia.nombre : 'Desconocida';
  }
  async getProjects() {
    let endpoint = 'https://josebuenoluis.com/api/proyectos';
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        console.log('Error: ', error);
        return {};
      });
  }

  async getTechnologies() {
    let endpoint = 'https://josebuenoluis.com/api/tecnologia';
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        console.log('Error: ', error);
        return {};
      });
  }
}
