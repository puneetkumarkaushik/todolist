let input = document.querySelector('input');
let add = document.querySelector('.add button');
let todolist = document.querySelector('.todolist ul');
let donelist = document.querySelector('.donelist ul');
let msg = document.querySelectorAll('.msg');

if(localStorage.todo) {
	let array = localStorage.todo.split(' ');

	for(let i=1; i<array.length; i++){
		createRow(array[i]);
	}

	toggleMessage();
}else {
	localStorage.setItem('todo', '');
}

if(localStorage.done) {
	let array = localStorage.done.split(' ');

	for(let i=1; i<array.length; i++){
		createRowInDonelist(array[i]);
	}

	toggleMessage();
}else {
	localStorage.setItem('done', '');
}



input.addEventListener('change', addItemOnEnter);
add.addEventListener('click', addItem);
todolist.addEventListener('click', doAction);


function addItemOnEnter(event){
	if(input.value.length > 0){
		createRow(input.value);
	}

	addInToDo(input.value);

	input.value = '';

	toggleMessage();
}


function addItem(){
	if(input.value.length > 0){
		createRow();
	}

	addInToDo(input.value);

	input.value = '';

	toggleMessage();
}

function doAction(event){
	if(event.target.nodeName === 'IMG' && event.target.title === 'Delete'){
		removefromToDo(event.target.parentElement.parentElement.children[0].innerHTML);
		event.target.parentElement.parentElement.remove();
	}
	else if(event.target.nodeName === 'IMG' && event.target.title === 'Done'){
		removefromToDo(event.target.parentElement.parentElement.children[0].innerHTML);
		addInDone(event.target.parentElement.parentElement.children[0].innerHTML);
		createRowInDonelist(event.target.parentElement.parentElement.children[0].innerHTML);
		event.target.parentElement.parentElement.remove();
	}

	toggleMessage();
}

function createRow(element){
	let li = document.createElement('li');
	li.setAttribute('class', 'row');

	let item = document.createElement('span');
	let actions = document.createElement('div');
	let deleteimg = document.createElement('img');
	let doneimg = document.createElement('img');

	item.innerHTML = element;

	deleteimg.setAttribute('class', 'actionimg');
	deleteimg.setAttribute('src', './img/delete.png');
	deleteimg.setAttribute('title', 'Delete');
	doneimg.setAttribute('class', 'actionimg');
	doneimg.setAttribute('src', './img/done.png');
	doneimg.setAttribute('title', 'Done');

	actions.appendChild(deleteimg);
	actions.appendChild(doneimg);

	li.appendChild(item);
	li.appendChild(actions);

	todolist.appendChild(li);
}

function createRowInDonelist(input){
	let li = document.createElement('li');
	li.setAttribute('class', 'row');

	let item = document.createElement('span');
	let doneimg = document.createElement('img');

	item.innerHTML = input;

	doneimg.setAttribute('class', 'actionimg');
	doneimg.setAttribute('src', './img/done.png');
	doneimg.setAttribute('title', 'Done');

	li.appendChild(doneimg);

	li.appendChild(item);
	li.appendChild(doneimg);

	donelist.appendChild(li);
}

function toggleMessage(){
	if(todolist.children.length > 0){
		msg[0].style.display = 'none';
	}
	else {
		msg[0].style.display = 'block';
	}

	if(donelist.children.length > 0){
		msg[1].style.display = 'none';
	}
	else {
		msg[1].style.display = 'block';
	}
}

function addInToDo(item){
	localStorage.todo = localStorage.todo.concat(` ${item}`);
}

function addInDone(item){
	localStorage.done = localStorage.done.concat(` ${item}`);
}

function removefromToDo(item){
	localStorage.todo = localStorage.todo.replace(` ${item}`, '');

	console.log(localStorage.todo.replace(` ${item}`, ''));
}