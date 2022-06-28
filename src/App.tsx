import React from 'react';
import './App.css';
import TaskBar from './components/taskBar';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';

class App extends React.Component {

  render() {
    return (
      <div className='container min-vh-100 min-vw-100 bg-dark'>
        <div className='container pt-5 pb-5 mb-5'>
          <TaskList></TaskList>
        </div>
        <TaskBar></TaskBar>
        <TaskForm></TaskForm>
      </div>
    );
  }
}

export default App; 