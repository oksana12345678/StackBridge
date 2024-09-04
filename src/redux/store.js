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
import waterNotesReducer from "./water/slice";
import { waterReducer as water2red } from "./waterConsumption/slice";
import dailyNormalModalSlice from "./dailyNormalModal/slice";

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
    waterNotes: waterNotesReducer,
    waterNotes2: water2red,
    dailyNormalModal: dailyNormalModalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});
export const persistor = persistStore(store);
