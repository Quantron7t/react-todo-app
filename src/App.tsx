import React from 'react';
import './App.css';
import TaskActions from './components/taskActions';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';

class App extends React.Component {
  
  render() {
    return (
      <>
        <div className='container'>
          <div className='mt-4 p-5 bg-dark text-dark rounded'>            
            <TaskList></TaskList>
          </div>          
        </div>  
        <TaskActions></TaskActions>  
        <TaskForm></TaskForm>
      </>
    );
  }
}

export default App; 