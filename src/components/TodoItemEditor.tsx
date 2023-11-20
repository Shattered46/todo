import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo, todoUpdated } from "../reducer/reducer";
import { TodoItemPojo } from "../data/TodoItem";

export interface TodoItemEditorProps {
    todo: TodoItemPojo | null
}

export function TodoItemEditor(props: TodoItemEditorProps) {
    const { todo } = props;
    
    const [title, setTitle] = useState(todo ? todo.title : "")
    const [content, setContent] = useState(todo ? todo.content : "")

    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(todo ? todo.title : "")
        setContent(todo ? todo.content : "")
    }, [todo])
    return (
    <div>
        <p>{ todo ? "Изменить todo" : "Добавить todo"}</p>
        
            <div>
                <input onInput={e => {setTitle((e.target as HTMLInputElement).value)}} value={title}/>
            </div>
            <div>
                <input onInput={e => setContent(e.target.value)} value={content}/>
            </div>
            <button
                onClick={() => {
                    let action;
                    if (todo) {
                        action = todoUpdated({...todo, title, content})
                    } else {
                        action = addTodo({title, content})
                        setTitle("")
                        setContent("")
                    }
                    dispatch(action)
                }}>
                { todo ? "update" : "add" }
            </button>
        
    </div>)
}