import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'

import Background from './Background'
import {getRandomDimensions} from './helpers'
import './CardCreator.css'
import {defaultCredits} from './defaultcredits'
import { Link } from 'react-router-dom'
const crypto = require('crypto')

class CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: '', names: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const inputName = event.target.name
        if (inputName === 'names') {
            this.setState({names: event.target.value.toUpperCase()})
            this.props.handleInputChange(this.props.index, inputName, event.target.value.toUpperCase())
        }
        if (inputName === 'title') {
            this.setState({title: event.target.value.toLowerCase()})
            this.props.handleInputChange(this.props.index, inputName, event.target.value.toLowerCase())
        }
    }

    render() {
        const titlePlaceholder = this.props.placeholder.title || '...'
        return (
            <div className='input-row'>
                <Textarea 
                    name='title' 
                    className='title-input'
                    placeholder={titlePlaceholder}
                    value={this.state.title} 
                    onChange={this.handleChange}
                />
                <Textarea
                    name='names' 
                    className='names-input'
                    placeholder={this.props.placeholder.names.join('\n').toUpperCase()}
                    value={this.state.names} 
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

class CardCreator extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            purple: getRandomDimensions(),
            green: getRandomDimensions(),
            cardValues: [],
            id: crypto.randomBytes(20).toString('hex')
        }
        // this.reportState = this.reportState.bind(this)
        this.submit = this.submit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    submit() {
        // console.log(this.state)
        const listifiedValues = this.state.cardValues.map((card) => {
            return {title: card.title, names: card.names.split('\n')}
        })
        fetch('/credits', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cards: listifiedValues, id: this.state.id})
        }).then(console.log)
    }
    handleInputChange(index, inputName, value) {
        const newValues = this.state.cardValues.slice()
        if (!newValues[index]) {
            newValues[index] = {}
        }
        newValues[index][inputName] = value
        this.setState({
            cardValues: newValues
        })
    }
    render() {
        let placeholderCards = []
        defaultCredits.map((holder, index) => {
            placeholderCards.push(
                <CardForm 
                    index={index} key={index} 
                    placeholder={holder} 
                    handleInputChange={this.handleInputChange}
                />
            )
        })
        return (
            <div>
                <Background purple={this.state.purple} green={this.state.green} />
                <div className='creator-container'>
                    <div className='instructions'>
                        Replace these titles and names with your own
                    </div>
                    {placeholderCards}
                    <Link to={'/show/' + this.state.id} value="Submit" onClick={this.submit}>Button text</Link>
                </div>
            </div>
        )
    }
}

export default CardCreator