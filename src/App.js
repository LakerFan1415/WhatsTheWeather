import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import SelectCity from './components/SelectCity';
import WeatherChart from './components/WeatherChart';


function App() {

  const [city, setCity] = useState('');

  const [chartInfo, setChartInfo] = useState({});

  //0 --> Current, 1 --> 2-Day Forecast, 2 --> 7-Day Forecast
  const [chartNumber, setChartNumber] = useState(null);


  const handleClick = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/; /* eslint-disable-line */
    let inputs = document.getElementById('city-input').value.toLowerCase();
    if(!format.test(inputs)){ 
      setCity(inputs);
      fetchCity(inputs);
     }

  }

  /* Adds and removes the selected class --> Used in header */
  const handleMenuClick = (e) => {
    let numbers = {'Current': 0, '2-Day Forecast':1, '7-Day Forecast':2}

        let listEl = document.getElementsByTagName('li');
        for (let i=0; i < listEl.length; i++){
            if (listEl[i].className){
                listEl[i].classList.remove(listEl[i].className);
            }
        }

        //Only Add Class If There is a city
        if(city){

        e.target.parentNode.classList.add('selected');
        
        setChartNumber(numbers[e.target.innerHTML])

        }
  }

  const fetchCity = async (city) => {

    //Read from localstorage
    if(localStorage.getItem(city)){
      let cachedCity = new Date(JSON.parse(localStorage.getItem(city))[0]).getTime()
      let currentTime = new Date().getTime()

      let timeSinceCache = currentTime - cachedCity

      //Read Data from Local Storage if time difference less than 2 minutes -> 120,000ms
      if(timeSinceCache < 120000){
        let weatherData = JSON.parse(localStorage.getItem(city))[1]
        
        setChartInfo(weatherData)

        //Set Value to Zero
        document.getElementById('city-input').value = '';

        return;
        }

      }

    try {
    const cityInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`);
    if (cityInfo.ok){
    const response = await cityInfo.json()

    //Fetches all Information
    // Added error handling
      const allData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude={part}&appid=${process.env.REACT_APP_API_KEY}`);
        if (allData.ok){
          const response2 = await allData.json()


        setChartInfo(response2);

        //Set to Local Storage for caching
        localStorage.setItem(city, JSON.stringify([new Date(), response2]) )

    }
    //Set Value to Zero
    document.getElementById('city-input').value = '';

  } else {
    throw new Error('Try Another City Or Check Spelling');
  }
    } catch(e) {
      document.getElementById('city-input').value = '';
      //Removes Chart If there is an error
      let chartParent = document.getElementById('charts');
      let currChart = document.getElementById('chart');
      if(chartParent.childNodes.length > 1){
        chartParent.removeChild(currChart);
        setChartInfo({});
        setCity('');

      }
      window.alert(e.message);

      //Remove selected class from nav bar
      document.getElementsByClassName('selected')[0].classList.remove('selected');

      //Add Loading Text
      document.getElementsByClassName('charts-loading')[0].style.display = "initial";

    }
    
  }

  return (
    <div className="main-container">
      <div style={{textAlign:'center'}}>
        <Header handleMenuClick={handleMenuClick}/>
        <SelectCity handleClick={handleClick} />
        <WeatherChart chartNumber={chartNumber} chartInfo={chartInfo} city={city}/>
      </div>
    </div>
  );
}

export default App;