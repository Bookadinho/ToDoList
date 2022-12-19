// selecionando os elementos
const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.input');
const tasksEl = document.querySelector('.tasks');

// fazendo a lista com json pra armazenar no localstorage
let list = JSON.parse(localStorage.getItem("tasks"));

// mostrando as tarefas já salvas
if(list) {
	list.forEach(task => {
		addTodo(task);
	});
}

formEl.addEventListener("submit", (e) => {
	e.preventDefault();

	addTodo();
});

// função pra adicionar no local storage
function addTodo(task) {
	let newTask = inputEl.value;

	if(task) {
		newTask = task.name;
	}

	const liEl = document.createElement("li");
	if(task && task.checked) {
		liEl.classList.add("checked");	
	}
	liEl.innerText = newTask;

	const checkBtnEl = document.createElement("div");
	checkBtnEl.innerHTML = `
		<i class="fas fa-check-square"></i>
	`;
	liEl.appendChild(checkBtnEl);

	const trashBtnEl = document.createElement("div");
	trashBtnEl.innerHTML = `
		<i class="fas fa-trash"></i>
	`;
	liEl.appendChild(trashBtnEl);

	tasksEl.appendChild(liEl);
	inputEl.value = "";

	checkBtnEl.addEventListener("click", () => {
		liEl.classList.toggle("checked");
		updateLocalStorage();
	});

	trashBtnEl.addEventListener("click", () => {
		let del = confirm("Tem certeza de deletar essa tarefa?");
		if(del) {
			liEl.remove();
			updateLocalStorage();
		}
	});

	updateLocalStorage();
}

function updateLocalStorage() {
	const liEls = document.querySelectorAll('.tasks li');
	list = [];

	liEls.forEach(liEl => {
		list.push({
			name: liEl.innerText,
			checked: liEl.classList.contains("checked")
		});
	});

	localStorage.setItem("tasks", JSON.stringify(list));
}