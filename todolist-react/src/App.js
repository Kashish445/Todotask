import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});
const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      when
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!, $when: String!) {
    addTask(input: { title: $title, description: $description, when: $when }) {
      task {
        id
        title
        description
        when
      }
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String!, $description: String!, $when: String!) {
    updateTask(id: $id, input: { title: $title, description: $description, when: $when }) {
      task {
        id
        title
        description
        when
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      success
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [newTask, setNewTask] = useState({ title: '', description: '', when: '' });

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.when.trim() !== '') {
      await addTask({
        variables: { ...newTask },
        refetchQueries: [{ query: GET_TASKS }],
      });
      setNewTask({ title: '', description: '', when: '' });
    }
  };

  const handleUpdateTask = async (id, title, description, when) => {
    await updateTask({
      variables: { id, title, description, when },
      refetchQueries: [{ query: GET_TASKS }],
    });
  };

  const handleDeleteTask = async (id) => {
    await deleteTask({
      variables: { id },
      refetchQueries: [{ query: GET_TASKS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="todoList">
      <div className="cover-img">
        <div className="cover-inner">
          <h3 className="plus-icon">Todo List</h3>
        </div>
      </div>
      <div className="content">
        <form onSubmit={handleAddTask}>
          <label>Title:</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <label>Description:</label>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <label>When:</label>
          <input
            type="text"
            value={newTask.when}
            onChange={(e) => setNewTask({ ...newTask, when: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <ul className="todos">
          {data.tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" id={`task-${task.id}`} />
              <label htmlFor={`task-${task.id}`}>
                <span className="check"></span>
                <span>{task.title} - {task.description} - {task.when}</span>
              </label>
              <button
                onClick={() => handleUpdateTask(
                  task.id,
                  prompt('Enter updated task title:', task.title),
                  prompt('Enter updated task description:', task.description),
                  prompt('Enter updated task when:', task.when)
                )}
              >
                Update
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;
