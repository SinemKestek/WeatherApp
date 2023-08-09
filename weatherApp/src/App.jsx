import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [location,setLocation]=useState('')
  const [weatherData,setWeatherData]=useState(null);

//  console.log(import.meta.env.VITE_WEATHER_API)

useEffect(()=>{
 const fetchData=async()=>{

  try{
  const response= await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
  setWeatherData(response.data)
   console.log(response)
  }
  catch(error){
    console.log(error)
  }
   
 }
 if(location){
  fetchData();
 }

},[location])
 
const handleLocationChange=(event)=>{
  setLocation(event.target.value)
}
  return (
    <>
      <div className='app-container'>
      <h1 className='app-title'>Weather App</h1> 
      <div className="input-container">
      <input type="text"  className='location-input' placeholder="please.." value={location}
        onChange={handleLocationChange}/>
      </div>
       </div>
       {weatherData && (< div className="weather-container">  
       
      {weatherData.forecast.forecastday.map((day)=>(
         <div className="day-container" key={day.date}>
        
           <img src={day.day.condition.icon}  className='weather-icon'/>
           <h2 className='date'>{day.date}</h2>
           <p className='temperature'>{day.day.avgtemp_c}</p>
           <p className='day-text'>{day.day.condition.text}</p>

 
       </div>
        
      )
       
         
    

      )}


       </div>

       )} 
    </>
 
  )
}

export default App
