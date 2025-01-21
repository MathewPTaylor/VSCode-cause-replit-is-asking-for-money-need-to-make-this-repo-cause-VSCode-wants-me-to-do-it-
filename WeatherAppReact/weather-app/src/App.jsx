import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import InputWrapper from './components/InputWrapper';
import axios from 'axios';
// import REACT_APP_WEATHER_API_KEY from "./my.env"

function App() {
  const [data, setData] = useState(null);
  const [inputVal, setInputVal] = useState("");

  const fetchMeSon = async () => {
    await fetch(`http://api.weatherapi.com/v1/current.json?key=${"e18d0119a83d406084423559251401"}&q=${"London"}`)
      .then(res => {
        console.log(res);
        res.json();
      }).then(data => {
        alert(data);
        console.log(data);
        // setData(data.message);
      }).catch((reason) => {
        alert(reason);
      })
  }

  const fetchMeSomeWaterBOY = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${"e18d0119a83d406084423559251401"}&q=${"London"}`)
    .then(response => {
      alert(JSON.stringify(response));
      console.log("RESPONSE BOIII", JSON.stringify(response));
      setData(response.message);
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  }

  const fetchMeNode = () => {
    axios.get("http://localhost:5000/api")
    .then(response => {
      console.log("RESPONSE YOOOO", response);
    }).catch(error => {
      alert(error);
      // console.error(error);
    })
  }

  const fetchMeNodeWeather = async () => {
    try {
      // get the data, for now just the location
      let dataa = {
        "location": inputVal
      }

      // do post request
      const response = await axios.post("http://localhost:5000/api/get_weather", dataa);

      console.log("BACKEND TIME BOYYYY", response);

    } catch (e) {
      console.error("ERROR WHILE TRYING: ", e)
    }
  }

  useEffect(()=>{
    // fetchMeSomeWaterBOY();
    // fetchMeSon();
    // fetchMeNode();
    fetchMeNodeWeather();
  }, []);

  const x = 25;
  const y = 25;
  return (
    <>
      <div>{null}</div>
      <div className="bg night">
        {}
      </div>
      <Header />
      <InputWrapper onChange={(val) => {setInputVal(val)}} onClick={() => {console.log(inputVal)}}/>
      <div className='mainCard darkMode'>
        <h2 className='locationTitle'>Bangkok, Thailand</h2>
        <div style={{fontSize: "4rem", margin: "2rem 0"}}>28ºC <span style={{color: "rgba(0, 0, 0, 0.3)"}}> | 67ºF</span></div>


        <div className="metWrapper">
          <img style={{marginRight: "0.5rem"}} src="https://cdn.weatherapi.com/weather/64x64/day/143.png" loading='lazy' alt="weather icon" title='Mist'></img>
          <div className='metInfo'>
            <p style={{margin: "1rem 0 0 0"}}>Humidity</p>
            <span>95%</span>
          </div>

          <div className='metInfo'>
            <p style={{margin: "1rem 0 0 0"}}>Wind</p>
            <span>3.5mph</span>
          </div>
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
      </div>
    </>
  )
}

export default App
