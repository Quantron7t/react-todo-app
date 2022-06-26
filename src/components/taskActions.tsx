import React from "react";

class TaskActions extends React.Component{

    render() {
        return (
          <nav className="navbar fixed-bottom navbar-dark bg-dark">
            <div className ="container-fluid">
              <a className="navbar-brand">Todo App</a>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">Add Task</button>
            </div>
          </nav>
        );
      }
} 

export default TaskActions