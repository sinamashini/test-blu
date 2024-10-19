import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import loanConfigSlice from '@/store/loansSlice';
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    loanConfig: loanConfigSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
