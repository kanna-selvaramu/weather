import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class Date extends Component {
  constructor(props) {
    super(props);   
  }
  render() {
    let date = this.props.date.split(" ");
    date = date[0];
    return (
      <div class = "cls_skDateWrapper">
        <div class = "cls_skDate">{date}</div>
      </div>
    )
  }
}

class WeatherIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let icon_class = "";
    {this.props.weather.map((item)=> {
      const icon = item.description.split(" ");
      icon_class = icon[0] + icon[1]; 
    })}
    return (
      <div class = "cls_skIconWrap">
        <div id = {icon_class} class = "cls_skWeatherImg"></div>
      </div>
    )
  }
}

class Temperature extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class = "cls_skTempWrapper">
        <div class = "cls_skTemp">{this.props.temp}<sup>F</sup></div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: []
    };
  }
  componentDidMount() {
    fetch("/forecast.json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          forecast: result.list
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }
  render(){
    const weather_forecast = this.state.forecast.slice(0,10).map((item, ctr) => (
      <div class = "cls_skWeatherWrapper" key = {ctr} id = {ctr}>
        <Link to={"/day/"+ctr}>
          <Date date = {item.dt_txt} key = {ctr}/>
          <WeatherIcon weather = {item.weather} />
          <Temperature temp = {item.main.temp} />
        </Link>
      </div >
    ));
    return (
      <div class = "cls_skForecastWrapp">
        <h1> Weather Forecast </h1>
          {weather_forecast}
      </div>
    )
  }
}

export {
  Date, 
  WeatherIcon,
  Temperature
}

export default App;
