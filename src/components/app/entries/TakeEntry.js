import React, { useState } from "react";


function TakeInput(initVal){
    const [ val, setVal] = useState(initVal)

    const handleChange=(e)=>{
        setVal(e.target.value)
    }

    const reset =()=>{
        setVal(initVal)
    }

    return{
        val,
        setVal,
        bind:{
            value: val,
            onChange: handleChange
        },
        reset,
        handleChange
    }

}

export default TakeInput;