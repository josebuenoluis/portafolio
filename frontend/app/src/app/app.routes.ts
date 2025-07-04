import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToDoAppComponent } from './components/to-do-app/to-do-app.component';
import { PanelBlogComponent } from './components/panel-blog/panel-blog.component';
import { PanelProyectosComponent } from './components/panel-proyectos/panel-proyectos.component';
import { LoginComponent } from './components/login/login.component';
import { permissionsGuard } from './guards/permissions.guard';
import { LogoutComponent } from './logout/logout.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { ProximamenteComponent } from './components/proximamente/proximamente.component';
export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"proyectos",component:ProjectsComponent},
    {path:"blog",component:ProximamenteComponent},
    {path:"contact",component:ContactoComponent},
    {path:"proyectos/to-do-app",component:ToDoAppComponent},
    {path:"proyectos/panel",component:PanelProyectosComponent,canActivate : [permissionsGuard]},
    {path:"blog/panel",component:PanelBlogComponent,canActivate : [permissionsGuard]},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent},
    {path:"mensaje",component:MensajeComponent},
    {path:"**",component:NotfoundComponent}
];
