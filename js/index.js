const toggleIcon = document.querySelector('.toggle-theme');
const addTodo = document.getElementById('add-todo');
const addButton = document.querySelector('.circle');
const itemsNumber = document.querySelector('.itemsleft');
const show = document.querySelector('.show-all');
const completed = document.querySelector('.filter-completed');
const active = document.querySelector('.filter-active');
AllTodos = []

//switch theme
toggleIcon.addEventListener('click', changeTheme)
function changeTheme() {
    document.body.classList.toggle('light-mode')
}

//add todo
addButton.addEventListener('click', AddTodo)
function AddTodo() {

    if (validateInput() == true) {
        AllTodos.push(addTodo.value)
        displayTodos()
        addTodo.value = ''
        console.log(AllTodos)
    }
}

// todo in dom
function displayTodos() {
    container = ``
    for (var i = 0; i < AllTodos.length; i++) {
        container += `

  <li class="task" draggable='true'>
<div>
<input type="checkbox"  class="checkbox-none"  name='todo-item'/>
  <label for="1"> ${AllTodos[i]}</label>
</div>
<span onclick='deleteTodo(`+ i + `)'><img src="images/icon-cross.svg" alt="delete" /></span>
</li>
<div class="hr"></div>
`
    }
    document.getElementById('list').innerHTML = container
    updateItemsCount(1)
}

//update  items
function updateItemsCount(number) {
    itemsNumber.innerHTML = +itemsNumber.innerHTML + number

}
//delete todo
function deleteTodo(indexofTodo) {
    AllTodos.splice(indexofTodo, 1)


    displayTodos()
    updateItemsCount(-2)
}
//validate input
function validateInput() {
    if (addTodo.value != '') {
        return true
    }
    else {
        return false
    }
}
//clear all completed
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll(`input[type='checkbox']:checked`).forEach(
        (item) => { (deleteTodo(item.closest('li'))) }

    )
})

//filter Active
active.addEventListener('click', filterActive)
function filterActive() {
    document.querySelectorAll('.task').forEach((todo) => {

        if (todo.querySelector('input').checked) {
            todo.style.display = 'none'

        }
    })
    show.classList.remove('active')
    completed.classList.remove('active')
    active.classList.add('active');

}

//filter Completed 
completed.addEventListener('click', filterCompleted)
function filterCompleted() {
    document.querySelectorAll('.task').forEach((todo, i) => {
        showAll()
        if (!todo.querySelector('input').checked) {
            todo.style.display = 'none'
        }
        active.classList.remove('active')
        show.classList.remove('active')
        completed.classList.add('active')

    })
}

//show All
show.addEventListener('click', showAll);
function showAll() {
    document.querySelectorAll('.task').forEach((todo) => {
        todo.style.display = 'flex'
    })
    completed.classList.remove('active');
    active.classList.remove('active')
    show.classList.add('active')

}






//drag and drop
new Sortable(document.querySelector('ul'))

