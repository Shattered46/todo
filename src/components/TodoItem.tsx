import { TodoItem as TodoItemData } from "../data/TodoItem";

export interface TodoItemProps {
    todoItem: TodoItemData
    onClick?: (id: number) => void,
    onDelete?: (id: number) => void,
    onMark?: (id: number) => void,
}

export function TodoItem(props: TodoItemProps) {
    const { title, content, id } = props.todoItem;
    const { onClick, onDelete, onMark } = props;
    return (
    <div className="todo-item">
        <div onClick={() => onClick && onClick(id)}>
            <p className="todo-item-title">{title}</p>
            <p className="todo-item-content">{content}</p>
        </div>
        <div>
            <button className="todo-item-delete" onClick={() => onDelete && onDelete(id)}>Delete</button>
            <button className="todo-item-mark" onClick={() => onMark && onMark(id)}>Mark</button>
        </div>
    </div>
    )
}