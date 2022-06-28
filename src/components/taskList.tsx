import React from "react";
import TaskStore from "../datastores/taskStore";
import TaskItem from "./taskItem";

class TaskList extends React.Component<any, any>{
    
    readonly taskStore = TaskStore.getInstance();

    constructor(props : any){
        super(props);
        console.log(this.taskStore.getAllTasks());
        this.state = {
            myTasks : this.taskStore.getAllTasks()
        }
    }
    
    componentDidMount(){
        this.taskStore.registerCallbacks(this.myTrigger);
    }
    
    myTrigger = () => {
        this.setState({myTasks : this.taskStore.getAllTasks()}); 
    }    
    
    renderList =() =>{
        if(this.state.myTasks.length > 0){
            return (
                this.state.myTasks.map((task:any) => (
                <TaskItem key={task.id} id={task.id} description={task.description} priorityLevel={task.priorityLevel} isCompleted={task.isCompleted}/>                
            )));
        }
        else {
            return <></>
        }
    }

    renderTitle = () => {
        if(this.state.myTasks.length > 0) return <h1 className="text-light fw-light fs-1 ms-2 mb-3">All tasks.</h1>
        else return <h1 className="text-light fw-light fs-1">No tasks found. Please add a task.</h1>
    }

    render(){
        return (
            <>
                { this.renderTitle() }
                { this.renderList() }
            </>
        );
    };
} 

export default TaskList;
