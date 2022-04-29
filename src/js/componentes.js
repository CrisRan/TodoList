import { Todo } from "../class";
import { todoList } from "../index";

//Referencias HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHTML= (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;


}

//Eventos
txtInput.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13 && txtInput.value != ''){
        const todo = new Todo(txtInput.value.trim());
        txtInput.value = '';
        todoList.nuevoTodo(todo);
        crearTodoHTML(todo);
    }
});

divTodoList.addEventListener('click',(e)=>{
    const elemento = e.target.localName;
    const todoElemt = e.target.parentElement.parentElement;
    const todoId = todoElemt.getAttribute('data-id');
    if(elemento.includes('input')){
        todoList.cambiarEstado( todoId );
        todoElemt.classList.toggle('completed');
    }
    if(elemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemt);
    }
});
btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1;i>=0;i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});


ulFiltros.addEventListener('click', (e)=>{
    const filtro = e.target.text;
    if(!filtro) {return;}
    
    anchorFiltros.forEach( e => e.classList.remove('selected') );
    e.target.classList.add('selected');
    
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch( filtro ){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    } 
});