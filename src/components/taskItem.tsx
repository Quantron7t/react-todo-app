import React from "react";
import TaskStore from "../datastores/taskStore";
import { ITask } from "../types/Task";
import TaskForm from "./taskForm";

class TaskItem extends React.Component<ITask>{
    
    taskStore = TaskStore.getInstance();
    
    constructor(props : any){
        super(props);
    }
    
    editTask = (taskId:string) => {
        console.log('edit', taskId);
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

    uniqueModalTag = () : string=> {
        return `.bd-add-modal-lg-edit-${this.props.id}`;
    }

    renderCheck = () =>{
        if(this.props.isCompleted){
            return (
                <div className="h-100 d-flex justify-content-center align-items-center fs-3" >
                    <i className="bi bi-check2-circle" ></i>
                </div>
            );
        }
        else return <></>;
    }

    renderCheckOptions = () =>{
        if(!this.props.isCompleted){
            return (
                <div className="p-2 bd-highlight" title="Mark as complete" onClick={ ()=>{ this.taskStore.markAsComplete(this.props.id) }}>
                    <i className="bi bi-clipboard2-check"></i>
                </div>
            );
        }
        else {
            return (
                <div className="p-2 bd-highlight" title="Mark as incomplete" onClick={ ()=>{ this.taskStore.markAsInComplete(this.props.id) }}>
                    <i className="bi bi-clipboard2-x"></i>
                </div>
            );
        }
    }

    render(){
        return (
            <>
                <div className="container rounded m-2" style={{background: `${this.getPriorityColor(this.props.priorityLevel)}`}}>
                    <div className="row rounded">
                        <div className="col-1">  
                            {this.renderCheck()}
                        </div>
                        <div className="col-11 text-light rounded" style={{background:"#808080"}}>
                            <div className="row">
                                <div className="col-10">
                                    <div className="d-flex flex-row bd-highlight mb-1" title="click to edit!" data-bs-toggle="modal" data-bs-target={this.uniqueModalTag()} onClick={()=>this.editTask(this.props.id)} style={{cursor:"pointer"}}>
                                        <div className="p-2 bd-highlight font-monospace">{this.props.description}</div>  
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="d-flex flex-row-reverse bd-highlight mb-1">
                                        <div className="p-2 bd-highlight" title="Remove task"
                                        onClick={ ()=>{ this.taskStore.removeTask(this.props.id) }}><i className="bi bi-x-lg"></i></div> 
                                        {this.renderCheckOptions()}                                   
                                    </div>
                                </div>
                            </div>                       
                        </div>
                    </div>
                </div> 
                <TaskForm taskId={this.props.id}></TaskForm>
            </>
        );
    };
} 

export default TaskItem;