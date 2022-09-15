import React, { useEffect, useState } from 'react'
import "./style.css"


export const Home = () => {
    const [data, setdata] = useState([])

    const axios = require('axios').default;

    useEffect(() => {
      axios.get("")
      .then((v)=>{
        console.log(v);
      })
      .catch((err)=>{
        console.log(err);
      })
    }, [])
    


  return (
    <div>

    </div>
  )
}
