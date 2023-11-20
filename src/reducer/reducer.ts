import { createStore } from "redux";
import { NewTodoItem, TodoItemPojo } from "../data/TodoItem";
import { useSelector } from "react-redux";

export type Action = AddTodo | DeleteTodo | MarkCompleted | UnmarkCompleted | ClickedTodo | UpdatedTodo;
export type AddTodo = { type: ActionType.AddTodo, todo: NewTodoItem }
export type MarkCompleted = { type: ActionType.MarkCompleted, id: number }
export type UnmarkCompleted = { type: ActionType.UnmarkCompleted, id: number }
export type DeleteTodo = { type: ActionType.DeleteTodo, id: number }
export type ClickedTodo = { type: ActionType.ClickedTodo, id: number }
export type UpdatedTodo = { type: ActionType.UpdatedTodo, todo: TodoItemPojo }

const enum ActionType {
    AddTodo = 'todo/added',
    MarkCompleted = 'todo/completed',
    UnmarkCompleted = 'todo/uncompleted',
    DeleteTodo = 'todo/deleted',
    ClickedTodo = 'todo/clicked',
    UpdatedTodo = 'todo/updated'
}

type State = {
    todos: TodoItemPojo[],
    lastId: number,
    editingTodo: TodoItemPojo | null,
}

export function useStoreState() {
    return useSelector<State, State>(state => state)
}

const defaultState: State = {
    todos: [],
    lastId: 0,
    editingTodo: null
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
        case ActionType.MarkCompleted: {
            const idx = state.todos.findIndex(item => item.id === action.id);
            if (idx != null) {
                const oldTodo = state.todos[idx]
                const newTodo = {...oldTodo, marked: !oldTodo.marked }
                const newTodos = [...state.todos];
                newTodos.splice(idx, 1, newTodo)
                newState.todos = newTodos;
            }
            return newState;
        }

        
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
        case ActionType.ClickedTodo: {
            const idx = state.todos.findIndex(item => item.id === action.id);
            if (idx != null) {
                newState.editingTodo = state.todos[idx];
            }
            return newState;
        }
        case ActionType.UpdatedTodo: {
            const newTodo = action.todo;
            const idx = state.todos.findIndex(item => item.id === newTodo.id);
            let newTodos;
            if (idx != null) {
                newTodos = [...state.todos]
                newTodos.splice(idx, 1, newTodo);
                newState.todos = newTodos
                newState.editingTodo = null;
            } else {
                console.log(`Action: UpdatedTodo; Error: item not found;`)
            }
            return newState;
        }
      default:
        return state
    }
}

export function addTodo(todo: NewTodoItem): AddTodo {
    return { type: ActionType.AddTodo, todo }
}

export function todoClicked(id: number): ClickedTodo {
    return { type: ActionType.ClickedTodo, id }
}

export function todoUpdated(todo: TodoItemPojo): UpdatedTodo {
    return { type: ActionType.UpdatedTodo, todo }
}

export function deleteTodo(id: number): DeleteTodo {
    return { type: ActionType.DeleteTodo, id }
}

export function todoMarked(id: number): MarkCompleted {
    return { type: ActionType.MarkCompleted, id }
}
