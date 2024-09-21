import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
    test('renders TodoList component', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Add new todo')).toBeInTheDocument();
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });

    test('displays initial todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add new todo');
        const addButton = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Todo Item' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Todo Item')).toBeInTheDocument();
        expect(input.value).toBe('');  // Check if input is cleared after adding
    });

    test('toggles a todo', () => {
        render(<TodoList />);
        const todoItem = screen.getByText('Learn React');

        fireEvent.click(todoItem);
        expect(todoItem).toHaveStyle('text-decoration: line-through');

        fireEvent.click(todoItem);
        expect(todoItem).toHaveStyle('text-decoration: none');
    });

    test('deletes a todo', () => {
        render(<TodoList />);
        const deleteButtons = screen.getAllByText('Delete');
        const firstTodoDeleteButton = deleteButtons[0];

        fireEvent.click(firstTodoDeleteButton);
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('does not add empty todos', () => {
        render(<TodoList />);
        const addButton = screen.getByText('Add Todo');
        const initialTodosCount = screen.getAllByRole('listitem').length;

        fireEvent.click(addButton);  // Try to add an empty todo

        expect(screen.getAllByRole('listitem')).toHaveLength(initialTodosCount);  // Todo count should not change
    });
});