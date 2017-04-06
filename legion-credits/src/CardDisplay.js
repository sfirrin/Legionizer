import React, { Component } from 'react'
// import logo from './logo.svg'
import './CardDisplay.css'
import Background from './Background'
import {getRandomDimensions} from './helpers'
import {defaultCredits} from './defaultcredits'

const TICK_INTERVAL = 900

class CardContainer extends Component {
    render() {
        return (
            <div className='text-container'>
                <div className='title'>{this.props.title}</div>
                <div className='name'>{this.props.names[0]}</div>
            </div>
        )
    }
}

class CardDisplay extends Component {
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
              <CardContainer 
                title={this.state.cards[this.state.currentCardIndex].title} 
                names={this.state.cards[this.state.currentCardIndex].names} 
              />
            </div>
        )
    }
}

export default CardDisplay
