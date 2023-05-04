"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectData } from "@/redux/sseSlice";
import { getNumberAction } from "@/redux/sagas";

export default function SseExample() {
  const dispatch = useDispatch();

  const data = useSelector(selectData);

  return (
    <div className="app">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(getNumberAction())}
      >
        add
      </button>
      <div className="flex w-full absolute top-0 pointer-events-none">
        {Object.entries(data).map(([id, stream], streamIndex) => (
          <div
            key={id}
            className="flex flex-col w-[200px] border border-red-700"
            style={{ transform: `translate(${streamIndex * 50}px, 50px)` }}
          >
            {stream.map((d, i) => (
              <div
                key={i}
                className={`inline-block w-[${d}%] shrink-0 grow-0 w-[${d}px] h-[24px] bg-blue-600 mb-[2px] text-white`}
                style={{ width: `${d}px` }}
              >
                {d}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
