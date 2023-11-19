export class TodoItem {
    id: number
    title: string
    content: string

    constructor()
    constructor(id: number, title: string, content: string)
    constructor(id?: number, title?: string, content?: string) {
        this.title = title ?? "";
        this.content = content ?? "";
        this.id = id ?? 0;
    }

    static from(pojo: TodoItemPojo): TodoItem {
        const id = pojo.id;
        const title = pojo.title;
        const content = pojo.content;
        const item = new TodoItem(id, title, content);
        return item;
    }
}

export type TodoItemPojo = Pick<TodoItem, "title"|"content"|"id">

export const sampleTodo: NewTodoItem = { title: "todo", content: "this is todo content" }
export type NewTodoItem = Omit<TodoItemPojo, "id">