import { v4 as uuidv4 } from 'uuid';
import { ITask} from "../types/Task";

class TaskStore{
    private static instance: TaskStore;
    private myTasks : Array<ITask>;    

    registeredCallbacks : Array<Function> = [];

    private constructor(){
        this.myTasks = [{ id : uuidv4(), description : "buy some beer", priorityLevel : 4 },
        { id : uuidv4(), description : "watch barcelona match on saturday", priorityLevel : 2 }];
        //this.myTasks = [];
    }

    public static getInstance(): TaskStore {
        if (!TaskStore.instance) {
            TaskStore.instance = new TaskStore();
        }

        return TaskStore.instance;
    }

    public getAllTasks() : Array<ITask> {
        return this.myTasks;
    }

    setTask(description : string, priorityLevel : number) : Array<ITask> {
        let newTask : ITask= { id : uuidv4(), description : description, priorityLevel : priorityLevel};
        this.myTasks.push(newTask);
        console.log('callback triggered');
        this.triggerCallbacks();
        return this.myTasks;
    }

    removeTask(id : string) : Array<ITask> {        
        return this.myTasks;
    }

    registerCallbacks(callback : Function){
        //console.log('my registered callback',callback)
        this.registeredCallbacks.push(callback);
    }

    triggerCallbacks(){
        let callbacks = this.registeredCallbacks;
        if(callbacks.length > 0){
            callbacks.forEach((element, index) => {
                console.log(`Current index: ${index}`);
                console.log(element);
                element();
            });
        }else {console.log("callbacks are empty");}
    }

}

export default TaskStore;