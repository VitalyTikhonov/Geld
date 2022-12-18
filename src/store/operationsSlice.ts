import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { Operation } from '../types/Operation';
import type { RootState } from './store';

// Define a type for the slice state
interface OperationsState {
  newOperation: Operation;
}

// Define the initial state using that type
const initialState: OperationsState = {
  newOperation: new Operation({
    id: v4(),
    timestamp: new Date().toISOString().split('T')[0],
  }),
};

export const operationsSlice = createSlice({
  name: 'operations',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    setNewOperation: (state, action: PayloadAction<Operation>) => {
      state.newOperation = { ...state.newOperation, ...action.payload };
    },
  },
});

export const { setNewOperation } = operationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNewOperation = (state: RootState) =>
  state.operations.newOperation;

export default operationsSlice.reducer;
