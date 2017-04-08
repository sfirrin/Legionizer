import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'

import Background from './Background'
import {getRandomDimensions} from './helpers'
import './CardCreator.css'
import {defaultCredits} from './defaultcredits'
import { Link } from 'react-router-dom'
const crypto = require('crypto')
const base64url = require('base64url')

class AboutInfo extends Component {
    render() {
        return (
            <div className='sub-instructions'>
                this site was made by Legion enthusiast Stephen Firrincieli <br />
                the source code is available at <a href='https://github.com/sfirrin/legionizer' target='blank'>this address</a><br />
                thanks for visiting
            </div>
        )
    }
}

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
                    autoFocus={this.props.index === 0 ? 'autoFocus' : ''}
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
            id: base64url(crypto.randomBytes(5))
        }
        // this.reportState = this.reportState.bind(this)
        this.submit = this.submit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.formsEmpty = this.formsEmpty.bind(this)
    }
    submit(event) {
        // console.log(this.state)
        if (this.state.cardValues.length === 0) {
            return true
        }
        const listifiedValues = this.state.cardValues.filter((card) => {
            return card !== null
        }).map((card) => {
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
    formsEmpty() {
        if (this.state.cardValues.length === 0) {
            return true
        }
        // console.log(this.state.cardValues)
        for (let card of this.state.cardValues) {
            if (!card) {
                continue
            }
            if (card.title || card.names) {
                return false
            }
        }
        return true
    }
    handleInputChange(index, inputName, value) {
        const newValues = this.state.cardValues.slice()
        if (!newValues[index]) {
            newValues[index] = {title: '', names: ''}
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
                        Enter your own titles and names to recreate the Legion credits
                    </div>
                    <div className='sub-instructions'>
                        or view the original credits <Link to='/original'>here</Link>
                    </div>
                    <div className='input-container'>
                        {placeholderCards}
                        <AboutInfo />
                    </div>
                    <Link 
                        className='submit-button' 
                        to={this.formsEmpty() ? '#' : '/' + this.state.id} 
                        value="Submit" 
                        onClick={this.submit}>
                            Create credits
                    </Link>
                </div>
            </div>
        )
    }
}

export default CardCreator