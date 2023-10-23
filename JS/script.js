const length = 80;

window.onload = () => {
    const panel = document.getElementById('matrix')
    createMatrix(panel, length)

    setInterval(() => {
        createFallingRow(getRandomRow(panel), generateString(getRandomNumber(50, 0)))
        createFallingRow(getRandomRow(panel), generateString(getRandomNumber(50, 0)))
    }, 20)
    
    setInterval(() => {
        updateLiveRow(getRandomRow(panel))
    }, 10);
}


let createMatrix = (panel, amount) => {
    for(let i = 0; i < amount; i++){
        let row = document.createElement('div')
        panel.appendChild(row)
    }
}

let generateString = (length) => {
    let string = '';
    const chars = "是不人他	这为之来我的"

    for(let i = 0; i < length; i++){
        string += chars.charAt(Math.random() * (chars.length - 0) + 0)
    }

    return string
}


let createFallingRow = (row, string) => {
    if (row.innerHTML.length > 1) row.innerHTML = '';
    for(let i = 0; i < string.length; i++){
        setTimeout(() => {
            row.innerHTML += string.charAt(i)
        }, 50 * i)    
    }
}

let getRandomRow = (parent) => {
    let index = Math.floor(Math.random() * (length - 0) + 0)
    return parent.children[index]
}

let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

let updateLiveRow = (row) => {
    if(row.innerHTML.length < 0) return;
    for(let i = 0; i < getRandomNumber(10, 1); i++){
        let data = row.innerHTML
        let index = getRandomNumber(data.length, 0)
        let firstPart = data.substr(0, index);
        let lastPart = data.substr(index + 1);
    
        let newString = firstPart + generateString(1) + lastPart;
        row.innerHTML = newString
    }
}   