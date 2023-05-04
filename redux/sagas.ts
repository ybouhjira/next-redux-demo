import { put, select, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";

export const getNumberAction = createAction("GET_NUMBER");
export const getNumberError = createAction("GET_NUMBER_ERROR", (error) => ({
  payload: { error },
}));
export const dataReceived = createAction(
  "DATA_RECEIVED",
  (data: number, streamID: number) => ({
    payload: { data, streamID },
  })
);

function* fetchUser() {
  try {
    const dataChannel = eventChannel(SSEEventChannelFactory);
    const sseData: Record<number, number[]> = yield select(
      (state) => state.sse.data
    );

    yield takeEvery(dataChannel, (data) =>
      onData(data, Object.keys(sseData).length)
    );
  } catch (e: any) {
    yield put(getNumberError({ error: e.message }));
  }
}

function* onData(data: number, streamID: number) {
  yield put(dataReceived(data, streamID));
}

function SSEEventChannelFactory(emitter: (data: any) => void) {
  const source = new EventSource("http://localhost:4000/random-number");

  source.addEventListener("message", (message) => {
    emitter(message.data);
  });

  source.addEventListener("error", (error) => {
    emitter(error);
  });

  return () => {
    source.close();
  };
}

function* mySaga() {
  yield takeEvery(getNumberAction, fetchUser);
}

export default mySaga;
