
import { TodoItemPojo } from "../data/TodoItem";
import { websocket } from "../reducer/websocket";
import { Client } from "../reducer/ws-messages";
import { useHistory, useLocation, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { State, todoClicked } from "../reducer/reducer";
import { useSelector } from "react-redux";

export interface TodoItemEditorProps {
    todo?: TodoItemPojo | null
}

interface FormData {
    title: string,
    content: string,
}

type SelectedState = {todos: TodoItemPojo[] };

export function TodoItemEditor(props: TodoItemEditorProps) {
    const { todo } = props;
    
    const { id: idParam } = useParams<{id?: string}>()
    const { todos } = useSelector<State, SelectedState>(state => ({ todos: state.todos }));
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(`${idParam}, ${todo?.id}`)
        if (idParam != null && +idParam !== todo?.id) {
            dispatch(todoClicked(+idParam))
        }
    }, [idParam, dispatch, todo, todos])
    
    const location = useLocation();
    const history = useHistory();
    const { register, setValue, handleSubmit } = useForm<FormData>();
    
    useEffect( () => {
        console.log(history.location)
        console.log(history.length)
        console.dir(history)
        if (history.length === 2) {
            const top = history.location;
            history.replace('/');
            history.push(top.pathname, top.state)
            console.log(history.location)
        } 
    }, [history, location])

    useEffect(() => {
        const title = todo ? todo.title : ""
        const content = todo ? todo.content : ""
        setValue("title", title)
        setValue("content", content)
    }, [setValue, todo])

    const onSubmit = (data: FormData) => {
        console.log('form submitted')

        const {title, content} = data;
        let action;
        if (todo) {
            action = Client.update({...todo, title, content})
        } else {
            action = Client.add({title, content, marked: false})
            setValue('title', "")
            setValue("content", "")
        }
        websocket.send(action);
    }

    return (
    <div>
        <p>{ todo ? "Изменить todo" : "Добавить todo"}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register('title')}/>
            </div>
            <div>
                <input {...register('content')}/>
            </div>
            <button
                onClick={() => {
                    
                }}>
                { todo ? "update" : "add" }
            </button>
            <button type="button" onClick={() => { history.goBack()}
            }>Back</button> 
        </form>
    </div>
    )
}