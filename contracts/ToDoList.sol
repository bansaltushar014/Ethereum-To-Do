pragma solidity ^0.5.0;

contract ToDoList {

    uint public taskcount=0;

    struct Task{
        uint id;
        string content;
        bool completed;
   }
   constructor() public{
       createTask("check out this");
   }
   mapping(uint=> Task) public tasks;

    event TaskCompleted(
        uint id,
        bool completed
    );

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

   function createTask(string memory _content) public{
       taskcount++;
       tasks[taskcount]= Task(taskcount,_content,false);
       emit TaskCreated(taskcount, _content, false);
   }

   function toggleCompleted(uint _id) public {
       Task memory _task = tasks[_id];
       _task.completed=!_task.completed;
       tasks[_id]=_task;
        emit TaskCompleted(_id,_task.completed);
   }
}