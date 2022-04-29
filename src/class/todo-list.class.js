import { Todo } from "./todo.class";

export class TodoList{
    
    constructor(){
        this.cargarLocalStorage();
    }


    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo( id ){
        this.todos = this.todos.filter(t => t.id != id);
        this.guardarLocalStorage();
    }
    cambiarEstado( id ){
        for( const todo of this.todos )
            if (todo.id == id) {
                todo.completado = !todo.completado;
                break;
            }
        this.guardarLocalStorage();
    }
    eliminarCompletados(){
        this.todos = this.todos.filter(t => !t.completado);
        this.guardarLocalStorage();
    }
    guardarLocalStorage(){
        const json = JSON.stringify(this.todos);
        localStorage.setItem('todo', json);
    }
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo'))
                    : [];
        this.todos = this.todos.map( Todo.fromJson );
    }
}