import React from "react";
import TaskStore from "../datastores/taskStore";


class TaskForm extends React.Component<{}, { defaultRangeValue : number }>{

    taskStore = TaskStore.getInstance();
    
    constructor(props : any){
        super(props);
        this.state = { defaultRangeValue : 2 };        
    }
    
    onTaskSubmit = (e:any) : boolean =>{
      e.preventDefault();
      console.log("task submitted!");
      this.taskStore.setTask(e.target.elements.taskDescription.value,e.target.elements.taskPriorityRange.value);
      return false;
    }
    
    setRangeState=(e:any)=>{
        console.log(e)
        this.setState({
            defaultRangeValue: e.target.value
        })
    }

    getPriorityColor = (priority:number): string =>{
        console.log("color prio",priority)
        let theColor = "";
        if(priority==1){
            theColor="#FF7F7F";
        }
        else if(priority==2){
            theColor="#FFD580";
        }
        else if(priority==3){
            theColor="#CBC3E3";
        }
        else if(priority==4){
            theColor="#90ee90";
        }
        else {
            theColor="#89CFF0";
        }        
        return theColor;
    }

    render(){
        return (
            <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a new task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={ (e)=> this.onTaskSubmit(e) }>
                            <div className="modal-body">
                                <div className="form-floating">                 
                                    <div className="mb-3">
                                        <label htmlFor="customRange3" className="form-label">Selected task priority</label>
                                        &nbsp;<span className="badge rounded-circle" style={{background:`${this.getPriorityColor(this.state.defaultRangeValue)}`}}>{this.state.defaultRangeValue}</span>
                                        <input name="taskPriorityRange" type="range" value={this.state.defaultRangeValue} onChange={(e)=>this.setRangeState(e)} className="form-range" min="1" max="5" step="1" id="customRange3"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="floatingTextarea2">Task Description</label>
                                        <textarea name="taskDescription" className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                    </div>    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default TaskForm;