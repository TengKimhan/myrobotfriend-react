import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css'
import Scroll from "../components/Scroll";
import ErrorBoundary from '../components/ErrorBoundary'

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount (){
        // fetch robots data from jsonplaceholder
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {this.setState({robots: users})});
        // this.setState({robots: robots});
    }

    // onSearchChange(event) {
    //     console.log(event.target.value);
    // }

    onSearchChange = (event) => {
        // change state
        this.setState({searchField: event.target.value}); 
    }

    render () {
        // Destructuring the this.state
        const { robots, searchField } = this.state;

        // filter robots
        const filterRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        })

        // check if no robots data
        return !robots.length ? 
            (
                <div className="tc">
                    <p className="f1">No robots</p>
                </div>   
            ) :
            (
                <div className="tc">
                    <h1 className="f1">Robot Friends</h1>
                    <SearchBox onSearchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filterRobots}/>
                        </ErrorBoundary>
                    </Scroll> 
                </div>      
            )
    }
}

export default App;