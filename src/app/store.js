import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import todoReducer from "../features/todo/todoSlice";

// Correctly configure persistConfig
const persistConfig = {
  key: "root", // This key determines the key used in localStorage
  version: 1, // Version of your persisted state
  storage, // Specifies the storage engine to use (localStorage)
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todo: persistedReducer, // Wrap your reducer with persistReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
