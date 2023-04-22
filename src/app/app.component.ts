import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = "Minhas tarefas";
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required,
      ])]
    });    

    this.load();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    
    if(index !== -1)
      this.todos.splice(index, 1);

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  addTodo() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;

    const newTodo = new Todo(
      id,
      title,
      false
    );

    this.todos.push(newTodo);
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }
  
  load() {
    const data = localStorage.getItem('todos');
    
    if(data)
      this.todos = JSON.parse(data);
  }
}
