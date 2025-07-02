import { Component,ViewChild,ElementRef,AfterViewInit, viewChild } from '@angular/core';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-to-do-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-app.component.html',
  styleUrl: './to-do-app.component.css'
})
export class ToDoAppComponent {
  tasks: Task[] = [];

  @ViewChild("inputTask") inputTask!: ElementRef;
  @ViewChild("listTasks") listTasks!: ElementRef;


  ngOnInit() {
    // Aqui comenzamos a operar para cargar las tareas
    const tasksFromStorage = window.localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    } else {
      this.tasks = [];
    }
    let fechaActual = this.obtenerFechaActual();
    const fechaElemento = document.querySelector('#date') as HTMLSpanElement;
    fechaElemento.textContent = fechaActual;
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    // Formatea la fecha en español
    return fechaActual.toLocaleDateString('es-ES', opciones);
  }

  agregarTarea() {
    // Aqui comenzamos a operar para añadir las tareas
    const taskText = this.inputTask.nativeElement.value;
    if (taskText.trim() != '') {
      const newTask : Task = {
        text: taskText,
        completed: false,
        edit: false
      };
      this.tasks.push(newTask);
      this.inputTask.nativeElement.value = '';
    }
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  eliminarTarea(event:Event){
    let btnTask = event.target as HTMLButtonElement;
    let containerSvg = btnTask.parentElement as HTMLDivElement;
    let posicionLista = containerSvg.closest('li') as HTMLLIElement;
    // Obtenemos la posicion de la tarea en la lista y eliminamos
    // la tarea por esta posicion en la lista
    let taskIndex = Array.from(this.listTasks.nativeElement.children).indexOf(posicionLista);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));

  }

  completarTarea(event:Event){
    let btnTask = event.target as HTMLButtonElement;
    let containerSvg = btnTask.parentElement as HTMLDivElement;
    let posicionLista = containerSvg.closest('li') as HTMLLIElement;
    // Obtenemos la posicion de la tarea en la lista y obtenemos
    // la tarea por esta posicion en la lista
    let taskIndex = Array.from(this.listTasks.nativeElement.children).indexOf(posicionLista);
    if(!containerSvg.classList.contains('completed')) {
      containerSvg.classList.add('completed');
      this.tasks[taskIndex].completed = true;
    }else{
      containerSvg.classList.remove('completed');
      this.tasks[taskIndex].completed = false;
    }
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));

  }

  editarTarea(event:Event){
    let btnTask = event.target as HTMLButtonElement;
    let containerSvg = btnTask.parentElement as HTMLDivElement;
    let posicionLista = containerSvg.closest('li') as HTMLLIElement;
    // Obtenemos la posicion de la tarea en la lista y obtenemos
    // la tarea por esta posicion en la lista
    let taskIndex = Array.from(this.listTasks.nativeElement.children).indexOf(posicionLista);
    // Obtenemos el texto de la tarea y lo cambiamos por el nuevo texto
    if(!this.tasks[taskIndex].edit){
      this.tasks[taskIndex].edit = true;
    }else{
      let newText2 = posicionLista.querySelector('.task-text') as HTMLInputElement;
      this.tasks[taskIndex].text = newText2.value;
      this.tasks[taskIndex].edit = false;
    }
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
