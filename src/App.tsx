import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import {useEffect, useReducer} from "react";
import {listTodos} from "./graphql/queries";
import {List} from "antd";
Amplify.configure(config);

const initialStats = {
    todos: [],
    loading: true,
    error: false,
    form: { name: '', description: '' },
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.todos, loading: false };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.todo] };
        case 'RESET_FORM':
            return { ...state, form: initialStats.form };
        case 'SET_INPUT':
            return { ...state, form: { ...state.form, [action.name]: action.value } };
        case 'SET_ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function App({ signOut, user }: WithAuthenticatorProps) {
    const [state, dispatch] = useReducer(reducer, initialStats);
    
    async function fetchTodos() {
        try {
            const client = generateClient();
            const todos = await client.graphql({ query: listTodos });
            dispatch({ type: 'SET_TODOS', todos: todos.data.listTodos.items})
        } catch (error) {
            console.log('error fetching todos:', error);
            dispatch({ type: 'SET_ERROR', error})
        }
    }
    
    useEffect(() => {
        fetchTodos();
    }, []);
    
    const styles = {
        container: { padding: 20 },
        input: { marginBottom: 10 },
        item: { textAlign: 'left' as 'left' },
        p: { color: '#1890ff' },
        error: { color: 'red' },
    }
    
    const renderItem = (item: any) => {
        return (
            <List.Item style={styles.item}>
                <List.Item.Meta
                    title={item.name}
                    description={item.description}
                />
            </List.Item>
        )
    }
    
    return (
      <>
        <h1>Hello {user?.username}</h1>
        <h2>Todo list</h2>
        <div>
            <List style={styles.container}
                loading={state.loading}
                dataSource={state.todos}
                renderItem={renderItem}
            />
        </div>
        <button onClick={signOut}>Sign out</button>
      </>
  );
}

export default withAuthenticator(App);
