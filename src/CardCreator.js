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
                this site was made by Stephen Firrincieli <br />
                the source code is available at <a href='https://github.com/sfirrin/legionizer' target='blank'>this address</a><br />
                thanks for visiting
            </div>
        )
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
        this.inputs = []
        for (let i=0; i<defaultCredits.length; i++) {
            this.inputs.push({})
        }
    }
    submit(event) {
        // console.log(this.inputs[0].title.value)
        const enteredCredits = []
        for (let i=0; i<this.inputs.length; i++) {
            if (this.inputs[i].title.value || this.inputs[i].names.value) {
                enteredCredits.push({
                    title: this.inputs[i].title.value || '',
                    names: this.inputs[i].names.value.toUpperCase().split('\n') || ''
                })
            }
        }
        if (enteredCredits.length === 0) {
            event.preventDefault()
            return false
        }
        // console.log(enteredCredits)
        // event.preventDefault()
        // return false
        fetch('/credits', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cards: enteredCredits, id: this.state.id})
        })//.then(console.log)
    }
    render() {
        let placeholderCards = []
        defaultCredits.map((holder, index) => {
            placeholderCards.push(
                <div className='form-row' key={index}>
                    <Textarea 
                        placeholder={holder.title || '...'} 
                        className='title-input'
                        ref={(input) => this.inputs[index].title = input }
                        autoFocus={index === 0 ? 'autoFocus' : ''}
                    />
                    <Textarea 
                        placeholder={holder.names.join('\n')} 
                        className='names-input'
                        ref={(input) => this.inputs[index].names = input }
                    />
                </div>
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
                        to={'/' + this.state.id} 
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