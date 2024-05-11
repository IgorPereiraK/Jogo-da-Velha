const squares = document.querySelectorAll(".square");
// let checarTurno = true;        // Caso queirar jogar com 2 player precisar ativar isso.

let fimDeJogo = false;            // Caso queirar jogar com 2 player precisar desativa isso.

const jogadorX = "X";
const jogadorO = "O";

const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] ;

document.addEventListener("click", (event) => {
    if(event.target.matches(".square")) {
        jogar(event.target.id, jogadorX);
        setTimeout(() => bot(), 500);
    }
});

function bot() {
    const posicoesDisponiveis = [];
    for (index in squares) {
        if(!isNaN(index)) {
            if(
                !squares[index].classList.contains("X") &&
                !squares[index].classList.contains("O")
            ) {
                posicoesDisponiveis.push(index);
            }
        }

    }
    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );

    if(!fimDeJogo) {      
        jogar(posicoesDisponiveis[posicaoAleatoria], jogadorO);
    }
}

function jogar(id, turno) {
    const square = document.getElementById(id);
    // turno = checarTurno ? jogadorX : jogadorO;    // Caso queirar jogar com 2 player precisar ativar isso.
    square.textContent = turno;
    square.classList.add(turno);
    checarVencedor(turno);
};

function checarVencedor(turno) {
    const vencedor = winStates.some((comb) => {
        return comb.every((index) => {
            return squares[index].classList.contains(turno);
        });
    });

    if (vencedor) {
        encerrarJogo(turno);
    } else if (checarEmpate()) {
        encerrarJogo();
    }
    // } else {
    //     checarTurno = !checarTurno;   // Caso queirar jogar com 2 player precisar ativar isso.
    // }
}

function checarEmpate() {
    let x = 0;
    let o = 0;

    for (index in squares) {
        if (!isNaN(index)) {
            if (squares[index].classList.contains(jogadorX)) {
                x++;
            }

            if (squares[index].classList.contains(jogadorO)) {
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
    fimDeJogo = true;   // Caso queirar jogar com 2 player precisar desativa isso.
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);
    if (vencedor) {
        h2.innerHTML = `O player <span>${vencedor}</span> venceu`;
    } else {
        h2.innerHTML = "Empatou";
    }

    let contador = 3;

    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000);

    setTimeout(() => location.reload(), 4000);
}




// iniciar minhas variaveis

// let board = ["", "","","", "","","", "",""];
// let playerTime = 0;
// let symbols = ["o", "x"];
// let gameOver = false;

// let winStates = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ] ;


// function handleMove(position) {

//         if (gameOver){
//             return
//         }

//         if (board[position] == "") {
//         board[position] = symbols[playerTime];

//         gameOver = isWin();

//             playerTime = (playerTime == 0) ? 1 : 0;
//     }

//     return gameOver;
// }

// function isWin(){

//     for (let i = 0; i < winStates.length; i++) {
//         let seq = winStates[i];

//         let post1 = seq[0];
//         let post2 = seq[1];
//         let post3 = seq[2];

//         if (board[post1] == board[post2] &&
//             board[post1] == board[post3] &&
//             board[post1] != "") {
//                 return true;
//             }
//     }
// }