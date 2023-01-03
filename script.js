// Reaproveitando o random em uma função para deixar o texto do HTML dinâmico.
const randomNumber = function(){return Math.ceil(Math.random() * 10)};

const questionEl = document.getElementById("question")
const inputEl = document.getElementById("input")
const formEl = document.getElementById("form")
const scoreEl = document.getElementById("score")

let score = JSON.parse(localStorage.getItem("score"))

if(!score){
    score = 0
}

updateContainerQuestions();

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Impedindo que o navegador atualize.
    const userAns = Number(inputEl.value)

    if(userAns === correctAnswers(userAns)){
        score++
        updateLocalStorage()
        updateContainerQuestions()
    }else{
        score--
        updateLocalStorage()
        updateContainerQuestions()
    }
})

/* Função responsável por dinamizar os valores dentro do container 
para que não precise atualizar a página, veja que estou reaproveitando a função randomNumber().
Depois, passo o valor do input para vazio('') e deixo ele focado (focus()), para que o usuário já possa informar a próxima resposta.*/
function updateContainerQuestions() {
    scoreEl.innerText = `score: ${score}`
    questionEl.innerHTML = `What is <span id="num1">${randomNumber()}</span> multiply by <span id="num2">${randomNumber()}</span> ?`
    inputEl.value = '';
    inputEl.focus();
}

/* Como o texto esta dinâmico, eu só preciso pegar os valores dos 
spans na hora que o site gerar e comparar com o valor passado pelo usuário */
function correctAnswers(userAns){
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    // Garantindo a conversão para Number(), mesmo sabendo que o javascript já converte direto(é uma boa pratica sempre converter com funções).
    return userAns = Number(num1.innerText * num2.innerText);
}

function updateLocalStorage(){
    localStorage.setItem("score", JSON.stringify(score))
}