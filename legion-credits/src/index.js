import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CardDisplay from './CardDisplay'
import CardCreator from './CardCreator'
import './index.css'
import './fonts.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'// import Routes from './routes'

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

class TestAbout extends Component {
    render() {
        return (<div>This is about</div>)
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Route path="/create" component={CardCreator} />
            <Route path="/show" component={CardDisplay} />
            <Route path="/about" component={TestAbout} />
        </div>

    </Router>,
  document.getElementById('root')
)