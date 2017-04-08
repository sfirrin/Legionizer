

export function getRandomInt(maxInt) {
      return Math.floor(Math.random() * maxInt)
}

export function getRandomDimensions() {
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