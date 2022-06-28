import React from "react";
import TaskStore from "../datastores/taskStore";
import { ITask } from "../types/Task";

/**
 * State object for setting values for editing only. 
 * Except for defaultPriority all other property of ITaskFormState will be undefined
 **/
interface ITaskFormState {
    defaultPriority:number,
    desc? :string,
    id? : string
}

class TaskForm extends React.Component<{ taskId?:string }, ITaskFormState>{

    taskStore = TaskStore.getInstance();
    
    constructor(props : any){
        super(props);
        if(this.props.taskId === undefined) {
            this.state = { defaultPriority : 5 };
        }
        else { 
            let task = this.taskStore.findTask(this.props.taskId);
            this.state = { 
                defaultPriority : task!.priorityLevel, 
                desc : task?.description,
                id : task?.id
            }; 
        }
    }

    onTaskSubmit = (e: any) : boolean =>{
      e.preventDefault();
      this.taskStore.setTask(e.target.elements.taskDescription.value,e.target.elements.taskPriorityRange.value);
      return false;
    }

    onEditedTaskSubmit = (e: any) : boolean =>{
        e.preventDefault();        
        this.taskStore.updateTask(this.state.id!, this.state.desc!,this.state.defaultPriority);
        return false;
    }
    
    setRangeState=(e:any)=>{
        this.setState({
            defaultPriority: e.target.value
        })
    }

    setDescState=(e:any)=>{
        this.setState({
            desc: e.target.value
        })
    }

    getPriorityColor = (priority:number): string =>{
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

    renderEditForm = () => {
        return (
            <div className={`modal fade bd-add-modal-lg-edit-${this.props.taskId}`} tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{background:"#3F4E4F"}}>
                        <div className="modal-header">
                            <h5 className="modal-title text-light fw-light fs-4" id="exampleModalLabel">Edit task</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={ (e)=> this.onEditedTaskSubmit(e) }>
                            <div className="modal-body">
                                <div className="form-floating">                 
                                    <div className="mb-3">
                                        <label htmlFor="customRange3" className="form-label text-light fw-light fs-6">Selected task priority</label>
                                        &nbsp;<span className="badge rounded-circle text-dark" style={{background:`${this.getPriorityColor(this.state.defaultPriority)}`}}>{this.state.defaultPriority}</span>
                                        <div className="slidecontainer">                                            
                                            <input 
                                                name="taskPriorityRange" 
                                                type="range" 
                                                value={this.state.defaultPriority} 
                                                onChange={(e)=>this.setRangeState(e)} 
                                                className="slider" 
                                                min="1" 
                                                max="5" 
                                                step="1" 
                                                id="customRange3"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-light fw-light fs-6" htmlFor="floatingTextarea2">Task Description</label>
                                        <textarea 
                                            name="taskDescription" 
                                            className="form-control fw-light" 
                                            placeholder="add task description here" 
                                            id="floatingTextarea2" 
                                            style={{height: "100px", background:"#4B5D67", border:"#4B5D67", color: "#EAE1E1"}}
                                            onChange={(e)=>{this.setDescState(e)}}
                                            value= {this.state.desc}>
                                        </textarea>
                                    </div>    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-dark border-1" data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } 

    renderAddForm = () => {
        return (
            <div className="modal fade bd-modal-lg-add" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{background:"#3F4E4F"}}>
                        <div className="modal-header">
                            <h5 className="modal-title text-light fw-light fs-4" id="exampleModalLabel">Add a new task</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={ (e)=> this.onTaskSubmit(e) }>
                            <div className="modal-body">
                                <div className="form-floating">                 
                                    <div className="mb-3">
                                        <label htmlFor="customRange3" className="form-label text-light fw-light fs-6">Selected task priority</label>
                                        &nbsp;<span className="badge rounded-circle text-dark" style={{background:`${this.getPriorityColor(this.state.defaultPriority)}`}}>{this.state.defaultPriority}</span>
                                        <div className="slidecontainer">                                            
                                            <input name="taskPriorityRange" type="range" value={this.state.defaultPriority} onChange={(e)=>this.setRangeState(e)} className="slider" min="1" max="5" step="1" id="customRange3"/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-light fw-light fs-6" htmlFor="floatingTextarea2">Task Description</label>
                                        <textarea name="taskDescription" className="form-control fw-light" placeholder="add task description here" id="floatingTextarea2" style={{height: "100px", background:"#4B5D67", border:"#4B5D67", color: "#EAE1E1"}}></textarea>
                                    </div>    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-dark border-1">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } 

    render(){
        if(this.props.taskId===undefined) return this.renderAddForm();
        else return this.renderEditForm();
    }
}

export default TaskForm;