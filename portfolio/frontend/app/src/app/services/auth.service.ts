import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string = '';
  username : string = '';
  password : string = '';
  public _logged = new BehaviorSubject<boolean>(false);
  constructor() { }

  async isAuth():Promise<boolean> {
    if(localStorage.getItem("username") && localStorage.getItem("password")){
      this.username = localStorage.getItem("username") || '';
      this.password = localStorage.getItem("password") || '';
      try {
        const data = await this.postToken();
        if(data.token != undefined){ 
          this.token = data.token;
          localStorage.setItem("token", this.token);
          this.setLogged(true);
        }else{
          localStorage.removeItem("token");
          this.setLogged(false);
        }

      } catch (error) {
        console.error('Error:', error);
        this.setLogged(false);
        return this.isLogged();
      }
    }
    return this.isLogged();
  }

  postToken(){
    return fetch('https://josebuenoluis.com/api/api-token-auth',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.username, password: this.password })  
    }).then(data => {
      return data.json();
    }).catch(error => {
      console.log("Error: ",error);
      return {};
    });
  }
  setLogged(value: boolean) {
    this._logged.next(value);
  }
  isLogged() : boolean{
    return this._logged.getValue();
  }
}
