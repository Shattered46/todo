import { useDispatch } from 'react-redux'
import { DeleteButton, TodoItem } from './components/TodoItem'
import { Action, State, todoClicked, todoMarked, useStoreState } from './reducer/reducer'
import { TodoItemEditor } from './components/TodoItemEditor'
import { requestTodos } from './reducer/requests'
import { ThunkDispatch } from 'redux-thunk'
import { thunkWebsocket, websocket } from './reducer/websocket'
import { Client } from './reducer/ws-messages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import styled from 'styled-components'

export type MyDispatch = ThunkDispatch<State, void, Action>

export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return width;
}

function App() {
    const state = useStoreState()
    const dispatch: MyDispatch = useDispatch();

    const history = useHistory();
    const width = useWindowWidth();

    const commentary = useMemo(() => width > 1000 ? "широко..." : "", [width])
    const handleAddButton = useCallback(() => history.push('/new'), [history]);

    useEffect( () => {
        if (state.requests.todos === 'none') {
            dispatch(requestTodos())
        }
    }, [state.requests.todos, dispatch]);
    
    useEffect(()=> {
        dispatch(thunkWebsocket())
    }, [dispatch])

    const { todos, editingTodo } = state;
    const components = todos.map(item => 
        <TodoItem 
            todoItem={item}
            onClick={id => { 
                history.push(`/edit/${id}`)
                dispatch(todoClicked(id)) } 
            }
            onDelete={id => websocket.send(Client.delete(id)) }
            onMark={todo => {
                websocket.send(Client.mark(todo.id, !todo.marked));
                dispatch(todoMarked(todo.id))
            }}
        />)
    return (
        <>
            <p>TO-DO App</p>
            <p>Current window width: {width}. {commentary} </p>
            <Switch>

                <Route path="/edit/:id">
                    <TodoItemEditor todo={editingTodo} />
                </Route>
                <Route path="/new">
                    <TodoItemEditor />
                </Route>
                <Route path="/">
                     <AppContainer>
                        <ComponentContainer>
                            { components }
                        </ComponentContainer>
                        <AddButton onClick={handleAddButton}/>
                    </AppContainer>    
                </Route>
            </Switch>
                    
        </>
    )
}

const AddButton = styled(DeleteButton)`
    background-color: darkgreen;
    background-image: url('icons8-plus.svg');
    position: fixed;
    bottom: 30px;
    right: 30px;
`;

const AppContainer = styled.div`
    display: flex;
    justify-content: center;
`

const ComponentContainer = styled.div`
    width: 600px;
`

export default App