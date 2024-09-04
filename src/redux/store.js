import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer } from "./auth/slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { modalReducer } from "./modalWindow/slice";
import monthStatsReducer from "./monthStats/slice";
import waterReducer from "./water/slice";
import { waterReducer as water2red } from "./waterConsumption/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    modal: modalReducer,
    monthStats: monthStatsReducer,
    water: waterReducer,
    water2: water2red,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
