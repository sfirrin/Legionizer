import React, { Component } from 'react'
import {Layer, Rect, Stage} from 'react-konva'

const PURPLE_HEX = '#865486'
const GREEN_HEX = '#206e16'
const GRAY_HEX = '#cccccc'


class Rectangle extends Component {
    render() {
        return (
            <Rect
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                fill={this.props.fill}
            />
        )
    }
}

class Background extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight
        }
    }
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight
            })
        }

    }
    render() {
        const purpleRect = (
            <Rectangle 
                x={this.props.purple.x}
                y={this.props.purple.y}
                width={this.props.purple.width}
                height={this.props.purple.height}
                fill={PURPLE_HEX}
            />
        )
        const greenRect = (
            <Rectangle 
                x={this.props.green.x}
                y={this.props.green.y}
                width={this.props.green.width}
                height={this.props.green.height}
                fill={GREEN_HEX}
            />
        )
        const grayRect = (
            <Rectangle 
                x='0' 
                y='0' 
                width={this.state.canvasWidth} 
                height={this.state.canvasHeight}
                fill={GRAY_HEX}
            />
        )
        const purpleOnTop = Math.random() > 0.5
        let layer = null
        if (purpleOnTop) {
            layer = (
                <Layer>
                    {grayRect}
                    {greenRect}
                    {purpleRect}
                </Layer>
            )
        } else {
            layer = (
                <Layer>
                    {grayRect}
                    {purpleRect}
                    {greenRect}
                </Layer>
            )
        }
        return (
            <Stage width={this.state.canvasWidth} height={this.state.canvasHeight}>
                {layer}
            </Stage>
        )
    }
}

export default Background