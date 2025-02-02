import React from 'react'

const Main = ({data}) => {
  return (
        <>
            <h2 className='locationTitle'>{data.name}, {data.country}</h2>
            <div className='lastUpdated'><strong>Last updated:</strong> {data.lastTime}</div>
            <div style={{fontSize: "4rem", margin: "2rem 0"}}>{Math.round(data.metData.tempC)}ºC <span style={{color: "rgba(0, 0, 0, 0.3)"}}> | {Math.round(data.metData.tempF)}ºF</span></div>

            <div className="metWrapper">
                <img style={{marginRight: "0.5rem"}} src={`https:${data.metData.condition.icon}`} loading='lazy' alt="weather icon" title={data.metData.condition.text}></img>
                <div className='metInfo'>
                    <img src="../src/assets/water-drops.png" alt="rain" width="26px" height="26px"/>
                    <span>{data.metData.precipMm}mm</span>
                </div>

                <div className='metInfo'>
                    <img src="../src/assets/right-arrow.png" alt="arrow" title="direction" width="18px" height="18px" style={{transform: `rotate(${data.metData.windDir + 90}deg)`, marginRight: '0.6rem'}}></img>
                    <span>{parseFloat(data.metData.wind)} kph</span>
                </div>

                <div className='metInfo'>
                    <img src="../src/assets/humidity.png" alt="humidity" title="humidity" width="30px" height="30px" className='mr-05'></img>
                    <span>{data.metData.humidity}%</span>
                </div>

                <div className={`metInfo aqiInfo`}> {/*  epa${data.aqiData.USEpaIndex} */}
                    <img src="../src/assets/air-quality.png" alt="pm 2.5" title="PM2.5" width="30px" height="30px" className='mr-05'></img>
                    <span>{Math.round(data.aqiData.pm2_5)} <small style={{color: '#123'}}>US AQI*</small></span>
                </div>

            </div>  
        </>
    )
}

export default Main