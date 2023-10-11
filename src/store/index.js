// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";



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



const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});



export default store;
