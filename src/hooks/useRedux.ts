import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRaw,
  useSelector as useSelectorRaw,
} from 'react-redux';
import { store } from 'redux/store';
import rootReducer from 'redux/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchRaw<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRaw;
