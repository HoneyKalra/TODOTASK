import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
  tasks: [],
  editedTaskId: 0,
  isChecked: false,
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      //edit task case//
      if (state.editedTaskId) {
        let updatedTasks = state.tasks.map((task) => {
          return task.id === state.editedTaskId
            ? (task = { ...task, taskName: action.payload.taskName })
            : task;
        });

        state.tasks = updatedTasks;
        state.allTasks = updatedTasks;
        state.editedTaskId = 0;
        return;
      }

      //action.payload is whole task object here//
      if (action.payload) {
        state.tasks.push(action.payload);
        state.allTasks.push(action.payload);
      }
    },
    removeTask: (state, action) => {
      //here action.payload is id//
      console.log(action.payload);
      let filteredTasks = state.tasks.filter((tasksNow) => {
        console.log(tasksNow.id);
        return action.payload !== tasksNow.id;
      });
      state.tasks = filteredTasks;
      state.allTasks = filteredTasks;
    },
    taskEdit: (state, action) => {
      //here action.payload is id//
      state.editedTaskId = action.payload;
    },

    taskCompleted: (state, action) => {
      let updatedTasks = state.tasks.map((task) => {
        return task.id === action.payload.taskId
          ? { ...task, taskCompleted: !task.taskCompleted }
          : { ...task };
      });
      state.tasks = updatedTasks;
      state.allTasks = state.tasks;
    },

    taskTypeDisplay: (state, action) => {
      //action.payload array which is filtered tasks//

      if (state.allTasks.length === action.payload.length) {
        state.tasks = action.payload;
      } else if (action.payload[0].taskCompleted === true) {
        state.tasks = action.payload;
        state.isChecked = true;
      } else if (action.payload[0].taskCompleted === false) {
        state.tasks = action.payload;
        console.log(state.isChecked);
      }
    },
  },
});
export const { addTask, removeTask, taskEdit, taskCompleted, taskTypeDisplay } =
  taskSlice.actions;
console.log(taskSlice);
export default taskSlice.reducer;
