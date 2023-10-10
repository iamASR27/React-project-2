// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      //automatically gets the latest state
      state.counter++; //now allowed here because redux toolkit use imer package which does not let the
    }, //state mutate.
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrease(state, action) {
      state.counter = state.counter - action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// const counterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         counter: state.counter + 1,
//         showCounter: state.showCounter,
//       };
//     case "DECREMENT":
//       return {
//         counter: state.counter - 1,
//         showCounter: state.showCounter,
//       };
//     case "INCREASE":
//       return {
//         counter: state.counter + action.amount,
//         showCounter: state.showCounter,
//       };
//     case "DECREASE":
//       return {
//         counter: state.counter - action.amount,
//         showCounter: state.showCounter,
//       };
//     case "TOGGLE":
//       return {
//         showCounter: !state.showCounter,
//         counter: state.counter,
//       };
//     default:
//       return state;
//   }
// };

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
