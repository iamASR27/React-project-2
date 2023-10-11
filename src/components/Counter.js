import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  // const counter = useSelector(state => state.counter);
  // const show = useSelector(state => state.showCounter);
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({type: 'INCREMENT'})
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    // dispatch({type: 'DECREMENT'})
    dispatch(counterActions.decrement());
  };
  const incrementBy5Handler = () => {
    // dispatch({type: 'INCREASE', amount: 5})
    dispatch(counterActions.increase(5)); // {type: 'SOME_UNIQUE-IDENTIFIER', payload: 10}
  };

  const decrementBy5Handler = () => {
    // dispatch({type: 'DECREASE', amount: 5 })
    dispatch(counterActions.decrease(5));
  };

  const toggleCounterHandler = () => {
    // dispatch({type: 'TOGGLE'})
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={incrementBy5Handler}>Increment by 5</button>
        <button onClick={decrementBy5Handler}>Decrement by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
