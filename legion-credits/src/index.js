import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import './fonts.css'
import {
  BrowserRouter as Router,
  Route,
  Link
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
            <Route exact path="/" component={App} />
            <Route path="/about" component={TestAbout} />
        </div>

    </Router>,
  document.getElementById('root')
)