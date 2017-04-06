import React, {Component} from 'react'
import Background from './Background'
import {getRandomDimensions} from './helpers'
import './CardCreator.css'
import {defaultCredits} from './defaultcredits'

class CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: '', names: ''};

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        
    }

    handleChange(event) {
        const inputName = event.target.name
        if (inputName === 'names') {
            this.setState({names: event.target.value.toUpperCase()})
        }
        if (inputName === 'title') {
            this.setState({title: event.target.value.toLowerCase()})
        }
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    render() {
        
        return (
            <div className='input-row'>
                <textarea 
                    name='title' 
                    className='title-input'
                    placeholder={this.props.placeholder.title}
                    value={this.state.title} 
                    onChange={this.handleChange}
                />
                <textarea
                    name='names' 
                    className='names-input'
                    placeholder={this.props.placeholder.names.join('\n')}
                    value={this.state.names} 
                    onChange={this.handleChange} 
                    style={{height: this.props.placeholder.names.length + 'em'}}
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
            green: getRandomDimensions()
        }
    }
    render() {
        let placeholderCards = []
        for (let holder of defaultCredits) {
            placeholderCards.push(
                <CardForm placeholder={holder} />
            )
        }
        return (
            <div>
                <Background purple={this.state.purple} green={this.state.green} />
                <div className='creator-container'>
                    {placeholderCards}
                </div>
            </div>
        )
    }
}

export default CardCreator