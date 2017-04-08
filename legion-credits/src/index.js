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
import {defaultCredits} from './defaultcredits'

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

class TestAbout extends Component {
    render() {
        return (<div>This is about</div>)
    }
}

const IdDisplay = ({ match }) => (
    <CardDisplay id={match.params.id} />
)

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={CardCreator} />
            <Route path="/:id" component={IdDisplay} />
        </div>

    </Router>,
  document.getElementById('root')
)