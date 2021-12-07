'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay();
    const orderedTodos = getSortedTodoForDisplay(todos);
    console.log('orderedTodos:', orderedTodos);

    const strHTMLs = orderedTodos.map(todo => {
        const className = (todo.isDone) ? 'done' : ''
        const strHTML = `<li class="${className}" onclick="onToggleTodo(this, '${todo.id}')">
            <span>${todo.txt}</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
         </li>`

        return strHTML
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
    console.log('gTodos.length:', gTodos.length);


    if (gTodos.length === 0) setNoTodosDisplayShow()


}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing..', todoId);
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(elTodo, todoId) {
    console.log('Toggling..', todoId);
    toggleTodo(todoId)
        // elTodo.classList.toggle('done') // but also need to re-render stat
    renderTodos()
}

function onAddTodo() {
    const elwhatTodoInput = document.querySelector('.what-todo')
    const elimportanceInput = document.querySelector('.importance')
    if (!elwhatTodoInput.value || !elimportanceInput.value || elimportanceInput.value > 3 || elimportanceInput.value < 1) return

    addTodo(elwhatTodoInput.value, +elimportanceInput.value)
    elwhatTodoInput.value = ''
    elimportanceInput.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By', filterBy);
    setFilter(filterBy)
    renderTodos()
}

function onSetOrderFilter(orderBy) {
    console.log('Orderd By', orderBy);
    setOrderFilter(orderBy)
    renderTodos()
}