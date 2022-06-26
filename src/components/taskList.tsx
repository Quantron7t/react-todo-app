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
            //chops: "ss"
        }
    }
    
    componentDidMount(){
        this.taskStore.registerCallbacks(this.myTrigger);
        console.log("Trigger registered!");
    }
    
    myTrigger = () => {
        this.setState({myTasks : this.taskStore.getAllTasks()}); 
    }    
    
    renderList =() =>{
        return (
                this.state.myTasks.map((task:any) => (
                <TaskItem key={task.id} id={task.id} desc={task.description} priority={task.priorityLevel}/>
            ))
        );
    }

    renderListOrMessage = () => {
        if(this.state.myTasks.length>0) return this.renderList();
        else return <h1>No tasks found. Please add a task.</h1>
    }

    render(){
        return (
            <>{ this.renderListOrMessage() }</>
        );
    };
} 

export default TaskList;

// this.state.myTasks.map((element:any) => (
//     <TaskItem id={element.id} desc={element.description} priority={element.priorityLevel} />
// ))