
import { useEffect, useState } from 'react'
import './App.css'

function App() {
   const[data,setData]=useState({
     celcius:'',name:'',humidity:'',speed:''
   });
   const[location,setLocation]=useState('')
   const[qeury,setQuery]=useState('')

const fetchWeather=(location)=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`)
  .then((res)=>{
    if(!res.ok){
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then((data)=>{
    console.log(data);
    setData({
      celcius: data.main.temp,
      name:data.name,
      humidity:data.main.humidity,
      speed :data.wind.speed,
      description:data.weather[0].main,
      feels_like:data.main.feels_like,

    });
    

  })
 .catch((err)=>console.log(err)
 )
};
useEffect(()=>{
  fetchWeather(location);
},[location]);
const handleSearch=(e)=>{
  if(e.key=='Enter'){
    setLocation(qeury);
    setQuery('')
  }
};





  return (
    <>
      <div className='app'>
        <div className='search'>
          <input  placeholder='Enter Location' value={qeury} onChange={(e)=>setQuery(e.target.value)}
          onKeyDown={handleSearch} type="text" />
          

        </div>
        <div className='container'>
          <div className="top">
            <div className="location">
            <p>{data.name}</p> 

            </div>
            <div className="temp">
              {data.celcius && <h1>{data.celcius}°C</h1>}
            </div>
            <div className='description'>
          {data.description &&<p>{data.description}</p>
        }
            </div>
          </div>
           <div className='bottom'>
            <div className="feels">
              {data.feels_like &&               <p>{data.feels_like }°C</p>
            }
                            {data.speed && <p>Feels Like</p>}

            </div>
            <div className="humidity">
              {data.humidity &&            <p>{data.humidity}%</p> 
            }
                          {data.speed && <p>Humidity</p>}

            </div>
            <div className='wind'>
              {data.speed && <p>{data.speed}km/h</p>}
              {data.speed && <p>Wind Speed</p>}
              
            </div>
           </div>
        </div>

      </div>
    </>
  )
}

export default App
