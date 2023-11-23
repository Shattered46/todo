import styled from "styled-components";
import { TodoItem as TodoItemData } from "../data/TodoItem";
import { useCallback } from "react";

export interface TodoItemProps {
    todoItem: TodoItemData
    onClick?: (id: number) => void,
    onDelete?: (id: number) => void,
    onMark?: (todoItem: TodoItemData) => void,
}

export function TodoItem(props: TodoItemProps) {
    const { title, content, id, marked } = props.todoItem;
    const { onClick, onDelete, onMark } = props;

    const handleMark = useCallback(() => onMark && onMark(props.todoItem), [onMark, props.todoItem]);
    const handleClick = useCallback(() => onClick && onClick(id), [onClick, id]);
    const handleDelete = useCallback(() => onDelete && onDelete(id), [onDelete, id]);

    return (
    <StyledTodoItem marked={marked}>
        <TodoBodyContainer>
            <Checkbox checked={marked} onClick={handleMark} />
            <TodoBody onClick={handleClick}>
                <Title>{title}</Title>
                <Content>{content}</Content>
            </TodoBody>
        </TodoBodyContainer>
        <DeleteButton onClick={handleDelete} />
    </StyledTodoItem>
    )
}

export type ClickHandler = (e: MouseEvent) => void;

const StyledTodoItem = styled.div<{ marked: boolean}>`
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    min-width: 300px;
    text-align: left;
`;
const Checkbox = styled.input.attrs<{ checked: boolean, onClick: ClickHandler }>(() => ({ type: 'checkbox'}))`
    width:30px;
    height:30px;
    min-width: 30px;
    min-height: 30px;
    margin-right: 20px;
    align-self: center;
`;
const Title = styled.p`
    height: 25px;
    overflow: hidden;
    overflow-wrap: anywhere;
`;
const Content = styled.p`
    height: 50px;
    overflow: hidden;
    overflow-wrap: anywhere;
`;
export const DeleteButton = styled.button<{ onClick: ClickHandler}>`
    height: 50px;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    background-color: darkred;
    background-image: url('icons8-trash.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    align-self: center;
    border-radius: 5px;
`;
const TodoBodyContainer = styled.div`
    display: flex;
`
const TodoBody = styled.div`
    height: 100px;
`