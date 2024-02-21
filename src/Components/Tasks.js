import { useState, useEffect } from "react";
import "./Tasks.css";
import {
  addTask,
  taskEdit,
  removeTask,
  taskCompleted,
  taskTypeDisplay,
} from "../Features/Task/TaskSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
function Tasks() {
  let { tasks, editedTaskId, allTasks, isChecked } = useSelector(
    (state) => state.todo
  );
  const [task, setTask] = useState("");

  const dispatch = useDispatch();
  function handleChange(ev) {
    setTask(ev.target.value);
  }

  function handleAddClick() {
    let newTask = {
      id: new Date().getTime().toLocaleString(),
      taskName: task,
      taskCompleted: false,
    };

    dispatch(addTask(newTask));

    setTask("");
  }

  function editTask(id) {
    tasks.map((task) => {
      task.id === id && setTask(task.taskName);
    });
    dispatch(taskEdit(id));
  }
  function handleChecked(ev, id) {
    let checkedStatus = ev.target.checked;
    let taskInfo = { checked: checkedStatus, taskId: id };

    dispatch(taskCompleted(taskInfo));
  }
  function handleCompletedClicked(event) {
    console.log(event);
    let completedTasks = allTasks.filter((task) => task.taskCompleted === true);
    dispatch(taskTypeDisplay(completedTasks));
  }
  function handleuncompletedClicked() {
    let unCompletedTasks = allTasks.filter(
      (task) => task.taskCompleted === false
    );
    dispatch(taskTypeDisplay(unCompletedTasks));
  }
  function handleAllClicked() {
    dispatch(taskTypeDisplay(allTasks));
  }

  return (
    <div className="task-container">
      <div className="tasks">
        <div className="input-group p-5 gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="New Task"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={task}
            onChange={handleChange}
          />
          <div className="input-group-append">
            {editedTaskId ? (
              <span
                className="input-group-text btn-add  text-white "
                id="basic-addon2"
                onClick={handleAddClick}
              >
                Edit
              </span>
            ) : (
              <span
                className="input-group-text btn-add  text-white "
                id="basic-addon2"
                onClick={handleAddClick}
              >
                Add
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="three-btns gap-3 input-group-append">
            <span
              className="input-group-text btn-add  text-white "
              id="basic-addon2"
              onClick={handleAllClicked}
            >
              All
            </span>
            <span
              className="input-group-text btn-add  text-white "
              id="basic-addon2"
              onClick={handleCompletedClicked}
            >
              Completed
            </span>
            <span
              className="input-group-text btn-add  text-white "
              id="basic-addon2"
              onClick={handleuncompletedClicked}
            >
              Uncompleted
            </span>
          </div>
        </div>
        {tasks[0] ? (
          tasks.map((task) => (
            <div className="task-display">
              <div className="task-styles">
                {task.taskCompleted ? (
                  <span style={{ textDecorationLine: "line-through" }}>
                    {task.taskName}
                  </span>
                ) : (
                  <span>{task.taskName}</span>
                )}
              </div>
              <div className="edit-delete-checked-styles">
                <input
                  type="checkbox"
                  style={{ marginTop: "-9px", width: "17.5px", height: "auto" }}
                  onChange={(ev) => {
                    handleChecked(ev, task.id);
                  }}
                ></input>
                <BiEdit
                  style={{ marginLeft: "10px" }}
                  onClick={() => editTask(task.id)}
                />
                <MdDelete
                  style={{ marginLeft: "10px" }}
                  onClick={() => dispatch(removeTask(task.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-task">your list is clear</div>
        )}
      </div>
    </div>
  );
}
export default Tasks;
