import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from 'redux/store';
import rootReducer from 'redux/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
