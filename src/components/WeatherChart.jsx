import Chart from 'chart.js/auto';
import { useEffect } from 'react';

import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherChart = ({chartNumber, chartInfo, city }) => {

  //ChartData2 & 3 used for daily temp
  var labels = [];
  var chartData = [];
  var chartData2 = [];
  var chartData3 = [];
  var chartDataset = [];


  //Converts Dates of hourly information
  const getDatesAndTimes = (d, num) => {
    
      labels = [];
      chartData = [];
      chartData2 = [];
      chartData3 = [];
    try {  
      if (num === 1){
        // Gets dates for hourly
        //Hourly is the 2 Day Forecast
        for (let i=0; i < d.hourly.length; i++){
          let date = new Date((d.hourly[i].dt) * 1000).toLocaleString();

          labels.push(date)
          chartData.push(d.hourly[i].temp)

        }
        chartDataset.push({
          label: 'Temperature',
          backgroundColor: '#219cd7',
          borderColor: '#219cd7',
          data: chartData,
        })

      } else if (num === 2){
        //Get dates & times for daily
        //Displays 8 Days
        for (let i=0; i < d.daily.length; i++){
          let date = new Date((d.daily[i].dt) * 1000).toDateString();

          //morn - day - night
          labels.push(date)
          chartData.push(d.daily[i].temp.morn)
          chartData2.push(d.daily[i].temp.day)
          chartData3.push(d.daily[i].temp.night)
        }
        // --> Length is 48 so 2 Days
        //Sets each line for the line chart
        chartDataset.push({
          label: 'Morning',
          backgroundColor: '#219cd7',
          borderColor: '#219cd7',
          data: chartData,
        })
        chartDataset.push({
          label: 'Day',
          backgroundColor: '#e0ad81',
          borderColor: '#e0ad81',
          data: chartData2,
          })
        chartDataset.push({
          label: 'Night',
          backgroundColor: '#070a0a',
          borderColor: '#070a0a',
          data: chartData3,
        })

      } else {
          for (let i=0; i < 24; i ++){
            let date = new Date((d.hourly[i].dt) * 1000).toLocaleString();

            labels.push(date)
            chartData.push(d.hourly[i].temp)
          }
          chartDataset.push({
            label: 'Temperature',
            backgroundColor: '#219cd7',
            borderColor: '#219cd7',
            data: chartData,
          })
        
      }

    }catch(e){

      }
  }

  getDatesAndTimes(chartInfo, chartNumber)


  var data = {
    labels: labels,
    datasets: chartDataset,
  }

  const config = {
      type: 'line',
      data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: city ? city[0].toUpperCase() + city.substring(1) : city, //Format the city name & size
            color: 'black',
            font: {
              size: 30
            }
          }
        }
      }
      
  }

      useEffect(() => { 
        let chartParent = document.getElementById('charts');
        
        //Clear Canvas for a new chart
        if(chartParent.childNodes.length > 1){
          chartParent.removeChild(document.getElementById('chart'));
        }
        

        //Create New Chart
        if (chartNumber != null){
          let el = document.createElement('canvas');
          el.id = 'chart';
          chartParent.appendChild(el);

          document.getElementById('chart').style.backgroundColor = "#c5d8ef";
          let chart = new Chart(
            document.getElementById('chart'),
            config
          )

        }

        //If there is a chart
        if(city && document.getElementById('chart')){
        //Remove Loading Text
        document.getElementsByClassName('charts-loading')[0].style.display = 'none';
      }else {
        //Re-Add Text
        document.getElementsByClassName('charts-loading')[0].style.display = 'initial'

      }
    })

    return(
      <div id='charts'>
            
        <p className='charts-loading'>
        Select A City Above...
        <WbSunnyIcon  className='sun-icon'/>
        </p>
      </div>
        
    )
}

export default WeatherChart;
