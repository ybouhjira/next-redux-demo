"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectCount,
} from "@/redux/counter/counterSlice";

function Counter() {
  const counter = useSelector(selectCount);
  const dispatch = useDispatch();

  const classes =
    "rounded-[100%] bg-blue-400 text-white text-2xl p-[10px] w-[36px] h-[36px] flex justify-center items-center ";

  return (
    <div className="flex justify-center items-center gap-8">
      <button onClick={() => dispatch(decrement())} className={classes}>
        -
      </button>
      <div className="text-[100px] text-blue-600">{counter}</div>
      <button onClick={() => dispatch(increment())} className={classes}>
        +
      </button>
    </div>
  );
}

function Items() {
  const counter = useSelector(selectCount);

  return (
    <div className="flex flex-wrap">
      {Array.from({ length: counter }).map((_, i) => (
        <div
          key={i}
          className="w-[40px] h-[40px] bg-amber-300 m-[2px] repeat-1"
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Counter />
      <Items />
    </div>
  );
}
