import { generateClient } from 'aws-amplify/api';
import {
  Button,
  Card,
  Collection,
  Divider, Flex,
  Heading,
  Input,
  Text,
  View, WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {useEffect, useReducer} from "react";
import {listTodos} from "../graphql/queries";
import {createTodo as createTodoMutation, deleteTodo as deleteTodoMutation} from "../graphql/mutations";
import {onCreateTodo} from "../graphql/subscriptions";
import { getCurrentUser } from 'aws-amplify/auth';

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
      return { ...state, todos: [action.todo, ...state.todos] };
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

const client = generateClient();

function Todos({ user }: WithAuthenticatorProps) {
  const [state, dispatch] = useReducer(reducer, initialStats);
  
  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await client.graphql({ query: listTodos }) as any;
        console.log('todos:', todos.data.listTodos.items);
        dispatch({ type: 'SET_TODOS', todos: todos.data.listTodos.items})
      } catch (error) {
        console.log('error fetching todos:', error);
        dispatch({ type: 'SET_ERROR', error})
      }
    }
    
    const currentUser = getCurrentUser();
    console.log('currentUser', currentUser)
    
    fetchTodos();
    const query = client.graphql({ query: onCreateTodo }) as any;
    const subscription = query.subscribe({
      next: (eventData: any) => {
        const todo = eventData.data.onCreateTodo;
        dispatch({ type: 'ADD_TODO', todo });
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  
  const createTodo = async () => {
    const { form } = state;
    if (!form.name || !form.description) {
      return alert('please enter a name and description');
    }
    const todo = { ...form, id: Date.now() };
    dispatch({ type: 'ADD_TODO', todo });
    dispatch({ type: 'RESET_FORM' });
    try {
      await client.graphql({ query: createTodoMutation, variables: { input: todo } });
      console.log('todo successfully created!');
    } catch (error) {
      console.log('error creating todo:', error);
    }
  }
  
  const deleteTodo = async ({ id }: any) => {
    const newTodosArray = state.todos.filter((todo: any) => todo.id !== id);
    dispatch({ type: 'SET_TODOS', todos: newTodosArray });
    try {
      await client.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
      console.log('todo successfully deleted!');
    } catch (error) {
      console.log('error deleting todo:', error);
    }
  }
  
  const onChange = (e: any) => {
    dispatch({ type: 'SET_INPUT', name: e.target.name, value: e.target.value });
  }
  
  return (
      <View as="section" margin='1rem'>
        <Heading level={2} width='100vw'>Todo list</Heading>
        <Card
            key={-1}
            borderRadius="medium"
            maxWidth="20rem"
            variation="outlined"
        >
          <Flex
              direction='row'
              justifyContent={'space-between'}
          >
            <View>
              <Input
                  name="name"
                  onChange={onChange}
                  value={state.form.name}
                  placeholder="name"/>
              <Input
                  name="description"
                  onChange={onChange}
                  value={state.form.description}
                  placeholder="description"/>
            </View>
            <Button variation="primary" colorTheme="info" loadingText="Loading" onClick={createTodo}>Create Todo</Button>
          </Flex>
        </Card>
        
        <Flex direction="column">
          <Divider
              margin='2rem 0'
              label="My Todos"
              size="large"
              orientation="horizontal" />
        </Flex>
        
        <Collection
            items={state.todos}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
        >
          {(item: any, index) => (
              <Card
                  key={index}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined"
              >
                <Flex
                    direction='row'
                    justifyContent={'space-between'}
                >
                  <View>
                    <Heading level={2}>{item.name}</Heading>
                    <Text>{item.description}</Text>
                  </View>
                  <Button variation="primary"  loadingText="Loading" onClick={() => deleteTodo(item)}>Delete</Button>
                </Flex>
              </Card>
          )}
        </Collection>
      </View>
  );
}

export default withAuthenticator(Todos);
