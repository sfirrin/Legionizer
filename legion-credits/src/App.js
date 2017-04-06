import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Background from './Background'

const TICK_INTERVAL = 900

function getRandomInt(maxInt) {
      return Math.floor(Math.random() * maxInt)
}

function getRandomDimensions() {
    // Returns an object with random dimensions to be used to draw rectangles
    const dimensions = {}
    // The 0.3 and 0.6 factors for max width and height 
    // are based on the shapes of the rectangles
    // that I've observed in the credit sequences
    dimensions.width = getRandomInt(Math.floor(window.innerWidth * 0.3))
    dimensions.height = getRandomInt(Math.floor(window.innerHeight* 0.6))
    dimensions.x = getRandomInt(window.innerWidth - dimensions.width)
    dimensions.y = getRandomInt(window.innerHeight - dimensions.height)
    
    return dimensions
}

var defaultCredits = [
        {
            "title": "directed by",
            "names": ["Michael Uppendahl"]
        },
        {
            "title": "written by",
            "names": ["Noah Hawley"]
        },
        {
            "title": "created by",
            "names": ["Noah Hawley"]
        },
        {
            "title": "written by",
            "names": ["Noah Hawley"]
        },
        {
            "title": "based on the Marvel Comics by",
            "names": ["Chris Claremont", "Bill Sienkiewicz"]
        },
        {   
            "title": "",
            "names": ["Dan Stevens"]
        },
        {   
            "title": "",
            "names": ["Rachel Keller"]
        },
        {   
            "title": "",
            "names": ["Aubrey Plaza"]
        }
    ]

class TextContainer extends Component {
    render() {
        return (
            <div className='text-container'>
                <div className='title'>{this.props.title}</div>
                <div className='name'>{this.props.names[0]}</div>
            </div>
        )
    }
}

class App extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            purple: getRandomDimensions(),
            green: getRandomDimensions(),
            tick: 0,
            currentCardIndex: 0,
            cards: defaultCredits,
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                purple: getRandomDimensions(),
                green: getRandomDimensions(),
                tick: this.state.tick + 1
            })
            if (this.state.tick % 3 === 0) {
                let newCardIndex = this.state.currentCardIndex + 1
                if (newCardIndex === this.state.cards.length) {
                    newCardIndex = 0
                }
                this.setState({currentCardIndex: newCardIndex})
            }
        }, TICK_INTERVAL)
    }
    render() {
        return (
            <div>
              <Background purple={this.state.purple} green={this.state.green} />
              <TextContainer 
                title={this.state.cards[this.state.currentCardIndex].title} 
                names={this.state.cards[this.state.currentCardIndex].names} 
              />
            </div>
        )
    }
}

export default App
