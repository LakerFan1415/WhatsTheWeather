import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import SelectCity from './components/SelectCity';
import WeatherChart from './components/WeatherChart';

function App() {

  const [city, setCity] = useState('');

  const [chartInfo, setChartInfo] = useState({});

  //0 --> Current, 1 --> 2-Day Forecast, 2 --> 7-Day Forecast
  const [chartNumber, setChartNumber] = useState(0);

  useEffect(() => {
    console.log('Rendered!');
    console.log(city);
    }
  )

  const handleClick = () => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let inputs = document.getElementById('city-input').value.toLowerCase();
    if(!format.test(inputs)){ 
      setCity(inputs);
      fetchCity(inputs);

     }

  }

  //Work on the fetch and how it is handled
  const fetchCity = async (city) => {
    try {
    const cityInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`);
    if (cityInfo.ok){
    const response = await cityInfo.json()

    //Fetches all Information
    // Added error handling
      const allData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude={part}&appid=${process.env.REACT_APP_API_KEY}`);
        if (allData.ok){
          const response2 = await allData.json()

          //if (response.message){window.alert('Please Enter Another City!')};

        setChartInfo(response2);

        //Converts unix utc date to local date
        // Will Need this conversion for chart
        if (response2.alerts) {
          let alertDate = new Date((response2.alerts[0].start) * 1000);
          let alertMonth = alertDate.getMonth() + 1;
          let alertDay = alertDate.getDate();
          let alertYear = alertDate.getFullYear();
          console.log(alertMonth + '-' + alertDay + '-' + alertYear)
      }
    }
  } else {
    throw new Error('Try Another City');
  }
    } catch(e) {
      console.log(e);
      // Add This in Production window.alert(e.message);
    }
    
  }

  return (
    <div style={{textAlign:'center'}}>
      <Header setChartNumber={setChartNumber} chartNumber={chartNumber}/>
      <SelectCity clickChange={handleClick} />
      <WeatherChart chartNumber={chartNumber} chartInfo={chartInfo} city={city}/>
    </div>
  );
}

export default App;