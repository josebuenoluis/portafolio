import { Component,ViewChild,ElementRef,inject } from '@angular/core';
import { Post } from '../../interfaces/post';
@Component({
  selector: 'app-panel-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './panel-proyectos.component.html',
  styleUrl: './panel-proyectos.component.css'
})
export class PanelProyectosComponent {
  @ViewChild("formulario") formulario! : ElementRef;
  selectedFile: File | null = null;

  postFormulario(event: Event) {
  event.preventDefault();

  const formData = new FormData(this.formulario.nativeElement);
  // const tecnologias = formData.getAll('tecnologia-seleccionada') as string[];
  const tecnologias = [1]
  const formData2 = new FormData();
  formData2.append("title", formData.get("titulo") as string);
  formData2.append("description", formData.get("descripcion") as string);
  formData2.append("url", formData.get("url") as string);

  if (this.selectedFile) {
    formData2.append("image", this.selectedFile);
  }

  // CORRECTO: Añadir cada tecnología por separado
  tecnologias.forEach(tecnologia => {
    formData2.append("tecnologias_fk", tecnologia.toString());
  });

  this.postPost(formData2);
}
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async postPost(post:FormData){
    let endpoint = "https://josebuenoluis.com/api/proyectos/";
    let token = localStorage.getItem("token");
    return fetch(endpoint, {
      method: "POST",
      headers: {
      "Authorization": `Token ${token}`
      },
      body:post
    }).then(data => {
      return data.json();
    }).catch(error => {
      console.log("Error: ",error);
      return {};
    });
  }
}
