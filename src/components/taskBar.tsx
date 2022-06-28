import React from "react";

class TaskBar extends React.Component {

  render() {
    return (
      <nav className="navbar fixed-bottom navbar-dark" style={{ background: "#3F4E4F" }}>
        <div className="container-fluid">
          <a className="navbar-brand"><i className="bi bi-journal-text"></i> Todo App</a>
          <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target=".bd-modal-lg-add">
            Add Task
          </button>
        </div>
      </nav>
    );
  }
}

export default TaskBar;