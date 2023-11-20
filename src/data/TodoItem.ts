export class TodoItem {
    id: number
    title: string
    content: string
    marked: boolean

    constructor()
    constructor(id: number, title: string, content: string, marked: boolean)
    constructor(id: number = 0, title: string = "", content: string = "", marked: boolean = false) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.marked = marked;
    }

    static from(pojo: TodoItemPojo): TodoItem {
        const id = pojo.id;
        const title = pojo.title;
        const content = pojo.content;
        const marked = pojo.marked;
        const item = new TodoItem(id, title, content, marked);
        return item;
    }
}

export type TodoItemPojo = Pick<TodoItem, "title"|"content"|"id"|"marked">

export const sampleTodo: NewTodoItem = { title: "todo", content: "this is todo content", marked: false }
export type NewTodoItem = Omit<TodoItemPojo, "id">