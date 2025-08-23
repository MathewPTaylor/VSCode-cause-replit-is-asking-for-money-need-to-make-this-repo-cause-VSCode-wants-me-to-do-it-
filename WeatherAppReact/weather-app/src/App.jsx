import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import InputWrapper from './components/InputWrapper';
import axios from 'axios';
import Main from './components/Main';
// import REACT_APP_WEATHER_API_KEY from "./my.env"
// require("dotenv").config()

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// alert(API_KEY); 

function App() {
  const [data, setData] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [pos, setPos] = useState([]);

  const fetchMeNodeWeather = (location) => {
      // get the data, for now just the location
      if (!location) {
        return
      }

      let dataa = {
        "location": location
      }
      // do post request
      axios.post("http://localhost:3001/api/get_weather", dataa)
      .then(resp => {
        setData(resp.data.data);
        console.log("BACKEND TIME BOYYYY", resp);
      }).catch((error) => {
        setData({
          error: {
            status: error.status,
            message: error.message
          }
        })
      });
  }


  const submit = (e) => {
    e.preventDefault();
    fetchMeNodeWeather(inputVal);
  }

  const success = (position) => {
    console.log(position);
    let {latitude, longitude} = position.coords;
    let locationString = `${latitude}, ${longitude}`;
    fetchMeNodeWeather(locationString); 
    setPos([latitude, longitude]);
  }

  const failure = (error) => {
    console.log("LOCATION FAILED", error);
  }

  function getUserLocation() {
    let options = {
      enableHighAccuracy: true
    }

    navigator.geolocation.getCurrentPosition(success, failure, options)
  }


  const onUserLocation = (e) => {
    e.preventDefault();
    getUserLocation();
  }
  
  return (
    <>
      <div className="bg day"></div>
      <Header />
      <InputWrapper onChange={(val) => {setInputVal(val)}} onClick={submit} onUserLocation={onUserLocation}/>
      <div className='mainCard'>
        {data? data.error? 
          (
            <h2 className='locationTitle'>Location Not Found.</h2> //
            // <h2>{data.error.message}{data.error.status}</h2>
          ) : (
          <Main data={data}/>
          ) : (
          <h2 className='locationTitle'>Search up a location</h2>
          )}
      </div>
      
        
        
        
        {/* <div className='cardHolder'>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
            return (
            <div className='dailyCard'>
              <div className='cardBanner'>{day}</div>
            </div>
            )
          })}
        </div> */}
      
    </>
  )
}

export default App
