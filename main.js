
// animação titulo ***

anime({
  targets: '.text-float',
  translateX: 80,
  direction: 'alternate',
  loop: true,
  easing: 'cubicBezier(.5, .05, .1, .3)'
})

let respostas = document.querySelectorAll('.alternative');
let questao = document.querySelector('.questions');
arrayExercicios = []
let sinais = ['+','-','*','/']

function getSinalRandom() {
  return sinais[Math.round(Math.random() * 3) ]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // The loop repeats until there are elements to mix
    randomIndex = Math.floor(Math.random() * currentIndex); // Select the remaining element.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Swapping with the current element.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Returning the shuffled array
}

class perguntas {
  constructor(a,b,sinal) {
    this.pergunta = `${a} ${sinal} ${b}`
    if (sinal == '+') {
      this.respostaCorreta = a + b
      this.respostas = [randint(30), randint(30), randint(30), randint(30), a + b]
    }
    if (sinal == '-') {
      this.respostaCorreta = a - b
      this.respostas = [randint(30), randint(30), randint(30), randint(30), a - b]
    }
    if (sinal == '*') {
      this.respostaCorreta = a * b
      this.respostas = [randint(30), randint(30), randint(30), randint(30), a * b]
    }
    if (sinal == '/') {
      this.respostaCorreta = Math.round(a / b)
      this.respostas = [randint(30), randint(30), randint(30), randint(30), Math.round(a / b)]
    }
    shuffle(this.respostas)
  }
}

  function gerarPerguntas () {
    let a = Math.round (Math.random() * 25)
    let b = Math.round (Math.random() * 22)
    let sinal = getSinalRandom()
    const pergunta = new perguntas(a,b,sinal)
    arrayExercicios.push(pergunta)
  }
  



function randint (max) {
  return Math.round (Math.random() * max)
}

let indiceExercicio = 0;
let acertos = 0;
let erros = 0;
let perguntasTotais = 0;

function mostrarProximaPergunta() {
  gerarPerguntas()
  perguntasTotais++;
  console.log(arrayExercicios)
  const exercicioAtual = arrayExercicios[indiceExercicio];
  questao.textContent = exercicioAtual.pergunta;
  respostas.forEach((resposta, index) => {
    resposta.style.backgroundColor = "#D3D3D3"
    resposta.style.color = "#2C3E50"
    resposta.textContent = exercicioAtual.respostas[index];
    if (resposta.innerHTML == exercicioAtual.respostaCorreta) {
      resposta.dataset.correta = exercicioAtual.respostaCorreta
    }
    
  });
}

mostrarProximaPergunta();

respostas.forEach(resposta => {
  resposta.addEventListener('click', function() {
    if (this.dataset.correta == resposta.innerHTML) {
      this.style.backgroundColor = 'green';
      indiceExercicio++;
      acertos ++;
      console.log('Você acertou: ' + acertos)
       setTimeout(() => {
        mostrarProximaPergunta();
      }, 500);


    } else {
      this.style.backgroundColor = 'red';
      indiceExercicio ++;
      erros ++;
      console.log('Você errou: ' + erros)
      setTimeout(() => {
        mostrarProximaPergunta();
        this.style.backgroundColor = '';
      }, 500);
    }
  });
});

let containerConteudo = document.querySelector('.container')
let containerH3 = document.querySelector('.descricao-end')
let titleH1 = document.querySelector('.title-quiz')
let btn_start = document.querySelector('.btn-start')
let cookie = false
let cookies = document.cookie.split('; ')

for (let i = 0; i < cookies.length; i ++) {
  if (cookies[i].split('=')[0] == 'Resultados') {
    cookie = cookies[i].split('=')[1]
    break
  }
}

if (cookie) {
  let data = cookie.split(',')
  containerH3.innerHTML = `Da Ultima vez, você acertou ${data[0]} de ${data[1]} perguntas.
  Sua eficácia é de ${data[2]}%`
}

containerConteudo.style.display = 'none'
btn_start.style.display = 'flex'
containerH3.style.textAling = 'center'
containerH3.style.display = 'flex'
containerH3.style.paddingTop = '10%'
containerH3.style.paddingBottom = '10%'
containerH3.style.fontSize = '1.3rem'

btn_start.addEventListener('click', function() {
  containerH3.style.display = 'none'
  containerConteudo.style.display = 'block'
  titleH1.style.display = 'none'
  btn_start.style.display = 'none'
  setTimeout ( function() {
  let eficacia = Math.round(acertos * 100 / perguntasTotais)
  containerConteudo.style.display = 'none'
  containerH3.style.display = 'flex'
  containerH3.innerHTML = `Parabéns, você acertou ${acertos} de ${perguntasTotais} perguntas.
  Sua eficácia é de ${eficacia}%`
  btn_start.style.display = 'flex'
//
  let formula = [acertos, perguntasTotais, eficacia]
  let new_cookie = `Resultados = ${formula}; max-age = 100000000000`
  document.cookie = new_cookie
}, 20000)
})
