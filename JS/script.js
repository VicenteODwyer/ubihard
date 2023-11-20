
// Define the length of the matrix
const length = 80;

// Function to run when the window loads
window.onload = () => {
    // Get the panel element from the HTML
    const panel = document.getElementById('matrix')

    // Create the matrix with the specified length
    createMatrix(panel, length)

    // Set an interval to create falling rows every 20 milliseconds
    setInterval(() => {
        createFallingRow(getRandomRow(panel), generateString(getRandomNumber(50, 0)))
        createFallingRow(getRandomRow(panel), generateString(getRandomNumber(50, 0)))
    }, 20)

    // Set an interval to update the live row every 10 milliseconds
    setInterval(() => {
        updateLiveRow(getRandomRow(panel))
    }, 10);
}

// Function to create the matrix
let createMatrix = (panel, amount) => {
    for(let i = 0; i < amount; i++){
        let row = document.createElement('div')
        panel.appendChild(row)
    }
}

// Function to generate a random string of a specified length
let generateString = (length) => {
    let string = ''
    const chars = "是不人他	这为之来我的"

    for(let i = 0; i < length; i++){
        string += chars.charAt(Math.random() * (chars.length - 0) + 0)
    }

    return string
}

// Function to create a falling row
let createFallingRow = (row, string) => {
    if (row.innerHTML.length > 1) row.innerHTML = ''
    for(let i = 0; i < string.length; i++){
        setTimeout(() => {
            row.innerHTML += string.charAt(i)
        }, 50 * i)   
    }
}

// Function to get a random row from the matrix
let getRandomRow = (parent) => {
    let index = Math.floor(Math.random() * (length - 0) + 0)
    return parent.children[index]
}

// Function to get a random number between a specified range
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

// Function to update the live row
let updateLiveRow = (row) => {
    if(row.innerHTML.length < 0) return
    for(let i = 0; i < getRandomNumber(10, 1); i++){
        let data = row.innerHTML
        let index = getRandomNumber(data.length, 0)
        let firstPart = data.substr(0, index)
        let lastPart = data.substr(index + 1)

        let newString = firstPart + generateString(1) + lastPart
        row.innerHTML = newString
    }
}
//
//This code creates a matrix of falling characters that update randomly. The comments provide a clear and concise explanation of each function's purpose..</s>