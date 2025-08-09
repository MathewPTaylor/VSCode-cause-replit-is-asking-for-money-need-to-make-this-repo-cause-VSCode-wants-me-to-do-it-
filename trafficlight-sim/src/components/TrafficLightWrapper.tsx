import { useEffect, useState } from 'react'
import React from 'react'
import Light from './Light'

interface WrapperProps {
  timeOut: number
}

function TrafficLightWrapper({timeOut}: WrapperProps) {
  const cols = ['red', 'yellow', 'green'];  
  const [lightIndex, setIndex] = useState(2);

  const handleClick = (index: number) => {
    setIndex(index);
  }


  useEffect(()=>{
    let nYellow = 1000;
    // const interval = setInterval(() => {
      const timer = setTimeout(() => {
        setIndex((prev) => prev - 1 % 3);
        const timer2 = setTimeout(() => {
          setIndex((prev) => prev - 1 % 3);
        }, nYellow);
        return () => {clearTimeout(timer2)}
      }, timeOut);
      
      return () => {clearTimeout(timer)}
    // }, 5000);

    // return () => {clearInterval(interval)}
  }
  ,[]);

  return (
    <>
      <div className='trafficWrapper'>
        {cols.map((item, index) => {
          return <Light colour={item} isOn={lightIndex == index} onClick={()=>{handleClick(index)}}></Light>
        })}
      </div>
    </>
  )
}

export default TrafficLightWrapper