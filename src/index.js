import './style.css';

import { TodoList } from './class';
import {crearTodoHTML} from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHTML );
