let order = []
let clickedOrder = []
let score = 0
let record = 0
//lembrar de criar record

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul
const BLUE = document.querySelector('.blue')
const RED = document.querySelector('.red')
const GREEN = document.querySelector('.green')
const YELLOW = document.querySelector('.yellow')


//Cria ordem aleatória de cores
let shuffleOrder = () => {
    let randomizeColors = Math.floor(Math.random() * 4)
    order[order.length] = randomizeColors
    clickedOrder = []

    for (let i in order) {
        let elementColor = createColorElement(order[i])
        lightColor(elementColor, Number(i) + 1)
    }
}
//Acendo a próxima cor
let lightColor = (element, number) => {
    number = number * 500
    setTimeout(() => {
        element.classList.add('selected-color')
    }, number - 250)

    setTimeout(() => {
        element.classList.remove('selected-color')
    })
}
//Verifica se a ordem esta correta
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver()
            break //para o for
        }
    }

    if (clickedOrder.length == order.length) {
        alert(`Score: ${score}\n Você acertou! Iniciando proximo nível`)
        nextLevel()
    }
}

//Função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color
    createColorElement(color).classList.add('selected-color')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected-color')
        checkOrder()
    }, 250)
}

// Função que retorna a cor
let createColorElement = (color) => {
    switch (color) {
        case 0:
            return GREEN;
            break;
        case 1:
            return RED;
            break;
        case 2:
            return YELLOW;
            break;
        case 3:
            return BLUE;
            break;
        default:
            return false;
    }
}

//Função para próximo nível do jogo
let nextLevel = () => {
    score++
    document.getElementById('table-score').innerHTML = score
    shuffleOrder()
}
//função para game over
let gameOver = () => {
    let action = confirm(`Pontuação: ${score}\nVocê perdeu o jogo!\n Deseja jogar novamente?`)
    if (action == true) {
        order = []
        clickedOrder = []
        record = score
        //Arrumar record para manter o maior score
        if (score <= record) {
            record = record
        } else {
            record = score
        }

        newGame()
    } else {
        window.close()
    }

}
//Função de novo jogo
let newGame = () => {
    score = 0
    document.getElementById('table-score').innerHTML = score
    newRecord = record
    if (newRecord > record) {
        record = record
    } else {
        document.getElementById('table-record').innerHTML = newRecord
    }
    nextLevel()
}

//Eventos de click para as cores
GREEN.onclick = () => click(0)
RED.onclick = () => click(1)
YELLOW.onclick = () => click(2)
BLUE.onclick = () => click(3)

// inicio de jogo.
newGame()