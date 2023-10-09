import { createStore } from "react-redux";

const counterReducer = (state = { counter: 0}, action) => {
    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1,
        }
    } else if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
        }
    } else if ( action.type === 'INCREMENTBY2') {
        return {
            counter: state.counter + 2,
        }
    } else if (action.type === 'DECREMENTBY2') {
        return {
            counter: state.counter - 2,
        }
    }
    return state;
};

const store = createStore(counterReducer);

export default store;