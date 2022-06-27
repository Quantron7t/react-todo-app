import { v4 as uuidv4 } from 'uuid';
import { ITask} from "../types/Task";
import _ from 'lodash';

class TaskStore{
    private static instance: TaskStore;
    private myTasks : Array<ITask>;    

    registeredCallbacks : Array<Function> = [];

    private constructor(){
        this.myTasks = [{ id : uuidv4(), description : "buy some beer", priorityLevel : 4, isCompleted:false },
        { id : uuidv4(), description : "watch barcelona match on saturday", priorityLevel : 2 , isCompleted:false}];
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

    setTask(description : string, priorityLevel : number) {
        let newTask : ITask= { id : uuidv4(), description : description, priorityLevel : priorityLevel, isCompleted:false};
        this.myTasks.push(newTask);
        this.triggerCallbacks();
    }

    removeTask(id : string) {   
        _.remove(this.myTasks , {
            id: id
        });     
        this.triggerCallbacks();
    }

    markAsComplete(id : string) {   
        let f = _.find(this.myTasks, { id: id });
        if(f){
            f.isCompleted = true;
            this.triggerCallbacks();
        }
        console.log('mark',this.myTasks);
    }

    markAsInComplete(id : string) {   
        let f = _.find(this.myTasks, { id: id });
        if(f){
            f.isCompleted = false;
            this.triggerCallbacks();
        }
        console.log('mark',this.myTasks);
    }

    registerCallbacks(callback : Function){
        //console.log('my registered callback',callback)
        this.registeredCallbacks.push(callback);
    }

    triggerCallbacks(){
        let callbacks = this.registeredCallbacks;
        if(callbacks.length > 0){
            callbacks.forEach((fx, index) => {
                console.log(`Current index: ${index}`);
                //console.log(fx);
                fx();
            });
        }else {console.log("callbacks are empty");}
    }

}

export default TaskStore;