import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect } from "react-router-dom";
import './ShareData.css';

class ShareData extends Component{
  constructor(props){
      super(props);
      this.state = {
      isLoading: true,
      data: []
    }
}
componentDidMount() {
    var alphAvantageApiKey = "JTC7AI3FI7FKHQ6Q";
    return fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey='+alphAvantageApiKey, {
        method:'GET',
        headers: new Headers({
        'Content-Type': 'application/json'
        })
      })
        .then((response) => response.json(this.state.data))
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            data: responseJson
          });
        })
        .catch((error) => {
          console.error(error);
        });

 }
 render() {
    const { isLoading } = this.state;
    const usr = (this.props.location.state === undefined) || (this.props.location.state === false) ? false : true;
    if(!usr) {
      return (
        (<Redirect to={{
          pathname: "/login",
          state: { from: this.state }
        }}/>)
      )
    } else if(this.state.isLoading) {
  	   return (
        <div className="loadingWrapper">
          Loading....
        </div>
  		)
    } else {
      let stockPrice = [];
      Object.entries(this.state.data["Time Series (Daily)"]).forEach(([value, stoke]) => {
           stockPrice.push(<StokePrice value={value} stoke={stoke}  />)
       });
      return (
        <div className="dataWrapper">
          <div>
          <div>{this.state.data["Meta Data"]["1. Information"]}</div>
          <div>{this.state.data["Meta Data"]["2. Symbol"]}</div>
          <div>{this.state.data["Meta Data"]["3. Last Refreshed"]}</div>
          <div>{this.state.data["Meta Data"]["4. Output Size"]}</div>
          <div>{this.state.data["Meta Data"]["5. Time Zone"]}</div>
          {stockPrice}
          </div>
        </div>
      )
    }
  }
}
class StokePrice extends Component {
  render() {
  let stoke = this.props.stoke;
  let value = this.props.value;
  let x  = [];

  Object.keys(stoke).forEach((key) => {
      x.push(<div> {value} ->   {stoke[key]}   </div>)
    });
     return (
       <div className="dataContainer">
        {x}
       </div>
     );
  }
}

export default ShareData;
