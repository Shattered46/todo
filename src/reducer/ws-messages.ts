import { NewTodoItem, TodoItemPojo } from "../data/TodoItem";

export type Properties<T> =  {
    [Key in keyof T  as 'prop' ]: T[Key]
}['prop']

export type ClientMessage = ReturnType<Properties<typeof Client>>
export type ClientMessageType = ClientMessage['type'];

export const Client = {
    add: (todo: NewTodoItem) => ({ type: 'ws/add', todo } as const),
    delete: (todoId: number) => ({ type: 'ws/delete', todoId } as const),
    mark: (todoId: number, state: boolean) => ({ type: 'ws/mark', todoId, state} as const),
    update: (todo: TodoItemPojo) => ({ type: 'ws/update', todo } as const)
}

export type ServerMessage = ReturnType<Properties<typeof Server>>
export type ServerMessageType = ServerMessage['type'];

export const Server = {
    added: (todo: TodoItemPojo) => ({ type: 'ws/added', todo } as const),
    deleted: (todoId: number) => ({ type: 'ws/deleted', todoId } as const),
    updated: (todo: TodoItemPojo) => ({ type: 'ws/updated', todo } as const),
    sync: (todos: TodoItemPojo[]) => ({ type: 'ws/sync', todos } as const),
    marked: (todoId: number, state: boolean) => ({type: 'ws/marked', todoId, state } as const)
}