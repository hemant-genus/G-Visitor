import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { increment,decrement,reset,incrementAddAmount } from './counterSlice'
import { useState } from 'react'
export const Counter = () => {
    debugger;
    const count=useSelector((state)=>state.counter.count);
    const dispatch =useDispatch();

    const [incrementAmount,setIncrementAmount]=useState(0);;
const addValue=Number(incrementAmount)||0;
const resetAll=()=>{
    setIncrementAmount(0);
    dispatch(reset());

}
  return (
   <section>
    <p>{count}</p>
    <div>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>

    </div>
    <input type='text' value={incrementAmount}
    onChange={(e)=>setIncrementAmount(e.target.value)}
    />  
    <div>
        <button onClick={()=>dispatch(incrementAddAmount(addValue))}
        >Add Amount</button>
         <button onClick={resetAll}
        >Reset Amount</button>
    </div>
      </section>
  )
}
