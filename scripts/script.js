const wrapper = document.querySelector('.wrapper');
const area = document.querySelector('.area');
const score = document.querySelector('.score');
const move = document.querySelector('.move');
const btn = document.querySelector('.btn');
const modelW = document.querySelector('.model-wrapper');
const modelT = document.querySelector('.model-title');
const scoreGame = document.querySelector('.score');


let step = 0;
let winner = '';
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

area.addEventListener('click', e => {
	if(e.target.className == 'box'){
		if(e.target.innerHTML == ''){
		e.target.innerHTML = step % 2 == 0 ? 'X' : 'O';
		e.target.style.color = step % 2 == 0 ? 'red' : 'white';
		step++;
		checkGame();
		}
	}
})

const checkGame = () => {
	const boxes = document.querySelectorAll('.box');
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