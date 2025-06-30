import React, { useEffect, useState } from "react"

const Alerthook =({initVal})=>{

    const [ alerto, setAlerto] = useState(initVal)

    useEffect(() => {
      console.log('alert chagned')
    }, [alerto])
    

    return {
        alerto,
        setAlerto
    }

}

export default Alerthook;