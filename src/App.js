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
        e.target.parentNode.classList.add('selected');
        
        setChartNumber(numbers[e.target.innerHTML])
  }

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


        setChartInfo(response2);

    }
    //Set Value to Zero
    document.getElementById('city-input').value = '';

  } else {
    throw new Error('Try Another City Or Check Spelling');
  }
    } catch(e) {
      window.alert(e.message);
    }
    
  }

  return (
    <div style={{textAlign:'center'}}>
      <Header setChartNumber={setChartNumber} chartNumber={chartNumber} handleClick={handleMenuClick}/>
      <SelectCity clickChange={handleClick} />
      <WeatherChart chartNumber={chartNumber} chartInfo={chartInfo} city={city}/>
    </div>
  );
}

export default App;