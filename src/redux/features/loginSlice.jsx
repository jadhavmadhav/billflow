import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [1,2,3,5],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload });
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});
 

export default todoSlice.reducer;
