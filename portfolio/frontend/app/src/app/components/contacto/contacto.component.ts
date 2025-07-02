import { Component,ViewChild,ElementRef,inject } from '@angular/core';
import { Contacto } from '../../interfaces/contacto';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  @ViewChild("formularioContacto") formularioContacto!: ElementRef;
  cookieService : CookieService = inject(CookieService);
  router : Router = inject(Router);

  postFormulario(event:Event){
    event.preventDefault();
    let formulario = this.formularioContacto.nativeElement as HTMLFormElement;
    let formData = new FormData(formulario);
    let datos: any = {};
    formData.forEach((value, key) => {
      datos[key] = value;
    });
    if(formulario.checkValidity()){
      this.postContacto(datos).then(data => {
        if(data.codigo==201){
          this.router.navigate(["/mensaje"]);
        }else{
          alert("Error al enviar mensaje...");
        }
      });
    }else{
      if (datos["nombre"] == "") {
        document.getElementById("msj-nombre")!.style.removeProperty("display");
        document.getElementById("msj-nombre")!.style.marginBottom = "1rem";
        const inputNombre = document.getElementById("nombre");
        if (inputNombre) {
          inputNombre.style.marginBottom = "0";
        }
      }else{
        document.getElementById("msj-nombre")!.style.display = "none";
        document.getElementById("msj-nombre")!.style.marginBottom = "0";
        const inputNombre = document.getElementById("nombre");
        if (inputNombre) {
          inputNombre.style.marginBottom = "1rem";
        }
      }
      if (datos["email"] == "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos["email"])) {
        document.getElementById("msj-email")!.style.removeProperty("display");
        document.getElementById("msj-email")!.style.marginBottom = "1rem";
        const inputEmail = document.getElementById("email");
        if (inputEmail) {
          inputEmail.style.marginBottom = "0";
        }
      }else{
        document.getElementById("msj-email")!.style.display = "none";
        document.getElementById("msj-email")!.style.marginBottom = "0";
        const inputEmail = document.getElementById("email");
        if (inputEmail) {
          inputEmail.style.marginBottom = "1rem";
        }
      }
      if (datos["mensaje"] == "") {
        document.getElementById("msj-mensaje")!.style.removeProperty("display");
        document.getElementById("msj-mensaje")!.style.marginBottom = "1rem";
        const inputMensaje = document.getElementById("mensaje");
        if (inputMensaje) {
          inputMensaje.style.marginBottom = "0";
        }
      }else{
        document.getElementById("msj-mensaje")!.style.display = "none";
        document.getElementById("msj-mensaje")!.style.marginBottom = "0";
        const inputMensaje = document.getElementById("mensaje");
        if (inputMensaje) {
          inputMensaje.style.marginBottom = "1rem";
        }
      }
    }

  }

  async postContacto(post:Contacto){
    let endpoint = "https://josebuenoluis.com/api/contacto/"
    return fetch(endpoint,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        'X-CSRFToken': this.cookieService.get('csrftoken')
      },
      body:JSON.stringify(post)
    }).then(data => {
      let respuesta = data.json();
      return respuesta.then((res: any) => {
        res.codigo = data.status;
        return res;
      });
    }).catch(error => {
      console.log("Error: ",error);
      return {};
    });
  }

}
