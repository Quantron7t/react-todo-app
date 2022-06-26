import React from "react";

class TaskItem extends React.Component<{ id:string, priority: number, desc: string}>{
    
    constructor(props : any){
        super(props);
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
            <div className="container rounded m-2" style={{background: `${this.getPriorityColor(this.props.priority)}`}}>
                <div className="row text-light rounded">
                    <div className="col-1">                    
                    </div>
                    <div className="col-11 text-light rounded" style={{background:"#808080"}}>
                    {this.props.desc}
                    </div>
                </div>                
            </div>
        );
    };
} 

export default TaskItem