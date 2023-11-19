import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../reducer/reducer";

export interface TodoItemEditorProps {

}

export function TodoItemEditor(props: TodoItemEditorProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const dispatch = useDispatch();

    return (
    <div>
        <p>Добавить todo</p>
        
            <div>
                <input onInput={e => {setTitle((e.target as HTMLInputElement).value)}}/>
            </div>
            <div>
                <input onInput={e => setContent(e.target.value)}/>
            </div>
            <button onClick={() => dispatch(addTodo({title, content}))}>Add</button>
        
    </div>)
}