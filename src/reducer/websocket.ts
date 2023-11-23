import { ThunkAction } from "redux-thunk"
import { Action, State, todoIndex } from "./reducer"
import { ClientMessage, Server, ServerMessage } from "./ws-messages"
import { HandlerObject } from "./requests"

export class TodoClientWebsocket {
    private websocket: WebSocket
   
    constructor() {
        this.websocket = new WebSocket('ws://localhost:11037/ws')
    }

    set onmessage(callback: (event: MessageEvent) => void) {
        this.websocket.onmessage = callback;
    }

    send(message: ClientMessage) {
        this.websocket.send(JSON.stringify(message))
    }
}

export const websocket = new TodoClientWebsocket();

export function thunkWebsocket(): ThunkAction<void, State, unknown, Action> {
    return dispatch => {
        websocket.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            dispatch(msg)
        }
    }
}

export function reducer(state: State, action: ServerMessage): State {
    switch (action.type) {
        case "ws/added": return Handler.added(state, action);
        case "ws/deleted": return Handler.deleted(state, action);
        case "ws/updated":return Handler.updated(state, action);
        case 'ws/marked': return Handler.marked(state, action);
        case "ws/sync":return Handler.sync(state, action);
    }
}

const Handler: HandlerObject<typeof Server> = {
    added: (state, action) => {
        const newTodos = [...state.todos]
        const newTodo = action.todo;
        const idx = todoIndex(state.todos, newTodo.id);
        const todoExists = idx !== -1;
        if (todoExists) {
            newTodos.splice(idx, 1, newTodo)
        } else {
            newTodos.push(newTodo);
        }
        return {...state, todos: newTodos};
    },
    deleted: (state, action) => {
        const newTodos = [...state.todos];
        const idx = todoIndex(state.todos, action.todoId);
        if (idx !== -1) {
            newTodos.splice(idx, 1);
        }
        return {...state, todos: newTodos}
    },
    updated: (state, action) => {
        const newTodos = [...state.todos]
        const newTodo = action.todo;
        const idx = todoIndex(state.todos, newTodo.id);
        const todoExists = idx !== -1;
        if (todoExists) {
            newTodos.splice(idx, 1, newTodo)
        } else {
            newTodos.push(newTodo);
        }
        return {...state, todos: newTodos};
    },
    marked: (state, action) => {
        const newTodos = [...state.todos]
        const idx = todoIndex(state.todos, action.todoId);
        if (idx !== -1) {
            const oldTodo = state.todos[idx];
            const newTodo = {...oldTodo, marked: action.state}
            newTodos.splice(idx, 1, newTodo);
        }
        return {...state, todos: newTodos}
    },
    sync: (state, action) => {
        return {...state, todos: action.todos}
    }
}