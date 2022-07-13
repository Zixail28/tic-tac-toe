const wrapper = document.querySelector('.wrapper');
const area = document.querySelector('.area');
const score = document.querySelector('.score');
const move = document.querySelector('.move');
const btn = document.querySelector('.btn');
const modelW = document.querySelector('.model-wrapper');
const modelT = document.querySelector('.model-title');
const scoreGame = document.querySelector('.score');
const btnBot = document.querySelector('.btn-bot');

let step = 0;
let winner = '';
let botMode = localStorage.getItem('botMode') == 'true' ? true : false;
const colorX = 'rgba(255,255,255,0.2)';
const colorW = 'rgba(255,255,255,0.2)';

scoreGame.innerHTML = `Games: ${localStorage.getItem('score')}`;

const arr = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[2,4,6],
	[0,4,8],
];

for(i = 0; i < 9; i++){
	area.innerHTML += `<div class="box" pos="${i}"></div>`
}

const boxes = document.querySelectorAll('.box');

	if(!botMode){
		btnBot.textContent = 'Play with BOT';
	} else{ btnBot.classList.toggle('active'); btnBot.textContent = 'Play with FRIEND' }


area.addEventListener('click', e => {
	if(e.target.className == 'box'){
		if(!botMode){
			if(e.target.innerHTML == ''){
				e.target.innerHTML = step % 2 == 0 ? 'X' : 'O';
				e.target.style.color = step % 2 == 0 ? 'red' : 'white';
				step++;
				checkGame();
				}
		} else{
			if(e.target.innerHTML == ''){
				e.target.innerHTML = step % 2 == 0 ? 'X' : 'O';
				e.target.style.color = step % 2 == 0 ? 'red' : 'white';
				step++;
				checkGame();
				if(step != 9) setTimeout(botStep, 100);
				}
		}
	}
})

function botStep() {
	let temp = getRandom(0,9);
	console.log(boxes[temp], temp)
	if(boxes[temp].textContent == ''){
		boxes[temp].innerHTML = step % 2 == 0 ? 'X' : 'O';
		boxes[temp].style.color = step % 2 == 0 ? 'red' : 'white';
		step++;
		checkGame();
	} else { botStep() }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const checkGame = () => {
	if(step == 9){		
		winner = 'Draw!'
		modelW.style.display = 'block';
		finish(winner);
}
	for(i = 0; i < arr.length; i++){
		if(boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X'){
			boxes[arr[i][0]].style.background = colorX;
			boxes[arr[i][1]].style.background = colorX;
			boxes[arr[i][2]].style.background = colorX;
			winner = '<p style="color:red;">X</p>  Winner!'
			modelW.style.display = 'block';
			finish(winner);
		} else if(boxes[arr[i][0]].innerHTML == 'O' && boxes[arr[i][1]].innerHTML == 'O' && boxes[arr[i][2]].innerHTML == 'O'){
			boxes[arr[i][0]].style.background = colorW;
			boxes[arr[i][1]].style.background = colorW;
			boxes[arr[i][2]].style.background = colorW;
			winner = '<p style="color:white;">O</p>  Winner!'
			modelW.style.display = 'block';
			finish(winner);
		}
		} 
}

const finish = (winner) => {
	modelT.innerHTML = `${winner}`;
}

btn.addEventListener('click', () => {
	localStorage.setItem('score', (+localStorage.getItem('score') + 1));
	location.reload();
})

btnBot.addEventListener('click', () => {
	btnBot.classList.toggle('active');
	if(botMode){
		btnBot.textContent = 'Play with BOT';
		localStorage.setItem('botMode', false);
	} else{ btnBot.textContent = 'Play with FRIEND'; 
	localStorage.setItem('botMode', true); }
	botMode = !botMode;
	console.log(botMode);
	step = 0;
	boxes.forEach((e) => {
		e.textContent = '';
	})
})