import { useDispatch } from 'react-redux'
import './App.css'
import { TodoItem } from './components/TodoItem'
import { sampleTodo } from './data/TodoItem'
import { addTodo, deleteTodo, todoClicked, useStoreState } from './reducer/reducer'
import { TodoItemEditor } from './components/TodoItemEditor'

function App() {
    const state = useStoreState()
    const dispatch = useDispatch();

    const { todos, editingTodo } = state;
    const components = todos.map(item => 
        <TodoItem 
            todoItem={item}
            onClick={id => dispatch(todoClicked(id))}
            onDelete={id => dispatch(deleteTodo(id))}
        />)
    return (
        <>
            <p>TO-DO App</p>
            <div className='todo-app-container'>
                <div>
                    { components }
                    <button onClick={ () => dispatch(addTodo(sampleTodo))}>Add</button>
                </div>
                <div>
                    <TodoItemEditor todo={editingTodo} />
                </div>
            </div>
        </>
    )
}



export default App
