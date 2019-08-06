import React, {Component} from 'react'
import './App.css';
import {Date, WeatherIcon,Temperature} from './App.js';

class Place extends Component {
    render() {
        return (
            <div class = "cls_skPlaceWrap">
                <div class = "cls_skPlace">{this.props.place}</div>
            </div>
        );
    }
}

class DescCont extends Component {
    render() {
        return (
            <div class = "cls_skDescWrap">
                <div class = {this.props.class} >
                    {this.props.title} {this.props.value}
                </div>
            </div>
        );
    }
}

class eachDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast : {
                dt_txt : "",
                weather : [
                    {
                        description : ""
                    }
                ],
                main : {
                    temp : "",
                    temp_min: "",
                    temp_max: "",
                    humidity: "",
                },
                wind: {
                    speed : "",
                    deg: ""
                },
            },
            city: ""
        }
    }
    componentDidMount() {
        fetch('/forecast.json')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    forecast : result.list[this.props.match.params.ctr],
                    city: result.city.name
                });
            }
        )
    }
    render() {
        return (
            <div class = "cls_skDayWrapper">
                <h1>Weather report</h1>
                <div class = "cls_skLeftCont">
                    <Place place = {this.state.city} />
                    <Date date = {this.state.forecast.dt_txt} />
                    <WeatherIcon weather = {this.state.forecast.weather} />
                    <Temperature temp = {this.state.forecast.main.temp} />
                </div>
                <div class = "cls_skRightTemp">
                    <DescCont class = "cls_skTempMin cls_skDesc" value = {this.state.forecast.main.temp_min} title = "Min Temperature" />
                    <DescCont class = "cls_skTempMax cls_skDesc" value = {this.state.forecast.main.temp_max} title = "Max Temperature" />
                    <DescCont class = "cls_skHumid cls_skDesc" value = {this.state.forecast.main.humidity} title = "Humidity" />
                    <DescCont class = "cls_skwind cls_skDesc" value = {this.state.forecast.wind.speed} title = "Wind(km/h)" />
                </div>
            </div>
        );
    }
}

export default eachDay;