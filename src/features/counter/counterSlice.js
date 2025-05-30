import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}
export const counterSlice = createSlice(
    {
        name: 'counter',
        initialState,
        reducers: {

            increment: (state) => {
                state.count += 1;
            },
            decrement: (state) => {
                state.count -= 1;
            },
            reset: (state) => {
                state.count = 0
            },
            incrementAddAmount:(state,action)=>
            {
                debugger;
                console.log('Payload:', action.payload);
                alert('aa'+action.payload);
                state.count +=action.payload;
            }
        }
    }
)

export const { increment, decrement,reset,incrementAddAmount } = counterSlice.actions;

export default counterSlice.reducer;