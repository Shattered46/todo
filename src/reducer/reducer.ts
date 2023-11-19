import { createStore } from "redux";
import { NewTodoItem, TodoItemPojo } from "../data/TodoItem";
import { useSelector } from "react-redux";

export type Action = AddTodo | DeleteTodo | MarkCompleted | UnmarkCompleted;
export type AddTodo = { type: ActionType.AddTodo, todo: NewTodoItem }
export type MarkCompleted = { type: ActionType.MarkCompleted, id: number }
export type UnmarkCompleted = { type: ActionType.UnmarkCompleted, id: number }
export type DeleteTodo = { type: ActionType.DeleteTodo, id: number }

const enum ActionType {
    AddTodo = 'todo/added',
    MarkCompleted = 'todo/completed',
    UnmarkCompleted = 'todo/uncompleted',
    DeleteTodo = 'todo/deleted'
}

type DefaultState = {
    todos: TodoItemPojo[],
    lastId: number,
}

export function useStoreState() {
    return useSelector<DefaultState, DefaultState>(state => state)
}

const defaultState: DefaultState = {
    todos: [],
    lastId: 0,
}
export const store = createStore(todoReducer);

export function todoReducer(state = defaultState, action: Action) {
    const newState = {...state};
    switch (action.type) {
      case ActionType.AddTodo: {
        const id = newState.lastId;
        const todo = { id, ...action.todo }
        newState.lastId = id + 1;
        newState.todos = [todo, ...state.todos];
        return newState
      }
      case ActionType.MarkCompleted:

        return { ...state }
        case ActionType.DeleteTodo: {
            const idx = state.todos.findIndex(item => item.id === action.id);
            if (idx != null) {
                console.log(idx)
                const newTodos = [...state.todos]
                newTodos.splice(idx, 1);
                newState.todos = newTodos;
            }
            
            return newState;   
        }
      default:
        return state
    }
}

export function addTodo(todo: NewTodoItem): AddTodo {
    return { type: ActionType.AddTodo, todo: todo }
}

export function deleteTodo(id: number): DeleteTodo {
    return { type: ActionType.DeleteTodo, id }
}

