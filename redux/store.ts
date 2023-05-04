import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/counter/counterSlice";
import { booksApi } from "@/redux/api";
import createSagaMiddleware from "@redux-saga/core";
import mySaga from "./sagas";
import sseReducer from "@/redux/sseSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    sse: sseReducer,
    counter: counterReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(sagaMiddleware);
  },
});

sagaMiddleware.run(mySaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
