import { Component,inject,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild("username") username! : ElementRef;
  @ViewChild("password") password! : ElementRef;
  private authService : AuthService = inject(AuthService);
  router : Router = inject(Router);

  login(event:Event){
      event.preventDefault();
      let user = this.username.nativeElement.value;
      let password = this.password.nativeElement.value;
      localStorage.setItem("username",user);
      localStorage.setItem("password",password);
 
      this.authService.isAuth().then(logged =>{
        if(logged){
          this.authService.setLogged(true);
          this.router.navigate(["/"]);
        }else{
          alert("El usuario ingresado no existe.");
        }
      });  
    }
}
