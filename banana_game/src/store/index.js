import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './setting/reducers';
const store = configureStore({
  reducer: {
    setting: settingReducer
  }
});

export default store;
