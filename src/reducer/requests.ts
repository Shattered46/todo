import { ThunkAction } from "redux-thunk";
import { TodoItemPojo } from "../data/TodoItem";
import { Action, State } from "./reducer";
import axios from "axios";

export type FunctionObject = {
    [key: string]: (...args: never[]) => object
}

export type HandlerObject<T extends FunctionObject> = {
    [Property in keyof T]: (state: Readonly<State>, action: ReturnType<T[Property]>) => State
}

export type RequestAction = TodosRequestStart | TodosRequestError | TodosRequestSuccess;
export type TodosRequestStart = { type: Type.Start }
export type TodosRequestSuccess = { type: Type.Success, todos: TodoItemPojo[] }
export type TodosRequestError = { type: Type.Error, error: unknown }

export const enum Type {
    Start = 'request/todo/start',
    Success = 'request/todo/success',
    Error = 'request/todo/error'
}

export const Todo = {
    start: () => ({ type: Type.Start } as const),
    success: (todos: TodoItemPojo[]) => ({ type: Type.Success, todos} as const),
    error: (error: unknown) => ({ type: Type.Error, error } as const)
}

export const HandleTodo: HandlerObject<typeof Todo> = {
    start: (state) => {
        const requests = {...state.requests }
        requests.todos = "start";
        const newState: State =  { ...state, requests };
        return newState;
    },
    success: (state, action) => {
        return { ...state, todos: action.todos }
    },
    error: (state, action) => {
        return { ...state, error: action.error }
    }
}

export function todoRequestReducer(state: State, action: RequestAction): State {
    switch (action.type) {
        case Type.Start: return HandleTodo.start(state, action);
        case Type.Success: return HandleTodo.success(state, action);
        case Type.Error: return HandleTodo.error(state, action);
    }
}

export const Request = {
    todo: Todo
}

export function requestTodos(): ThunkAction<void, State, unknown, Action> {
    return dispatch => {
        dispatch(Request.todo.start())
        axios.get('/todos')
            .then(val => {
                const parsed: TodoItemPojo[] = val.data as TodoItemPojo[];
                dispatch(Request.todo.success(parsed))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

