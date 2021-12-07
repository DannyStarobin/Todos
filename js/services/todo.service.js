'use strict'

var gTodos = _createTodos()
var gFilterBy = 'ALL'
var gOrderBy

function getSortedTodoForDisplay(todos) {


    if (gOrderBy === 'importance') {
        var orderedTodos = todos.sort((a, b) => (a.importance > b.importance) ? 1 : -1)
        return orderedTodos
    } else if (gOrderBy === 'txt') {
        var orderedTodos = todos.sort((a, b) => (a.txt.toUpperCase() > b.txt.toUpperCase()) ? 1 : -1)
        return orderedTodos
    } else {
        var orderedTodos = todos.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        return orderedTodos
    }
}



function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTojsdos
    const todos = gTodos.filter(todo =>
        (todo.isDone && gFilterBy === 'DONE') ||
        (!todo.isDone && gFilterBy === 'ACTIVE'))

    return todos
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    const todos = gTodos.filter(todo => !todo.isDone)
    return todos.length
}

function setOrderFilter(orderBy) {
    gOrderBy = orderBy
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function removeTodo(todoId) {
    if (!confirm('Delete?')) return
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()

}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}


// Those are "private" functions meant to be used ONLY by the service itself
function _createTodo(txt, importance = 3) {
    const todo = {
        id: _makeId(),
        txt: txt,
        createdAt: Date.now(),
        importance: importance,
        isDone: false
    }
    return todo
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || todos.length === 0) {
        todos = [
            _createTodo('Learn JS'),
            _createTodo('Master CSS'),
            _createTodo('Study HTML'),
        ]
    }
    gTodos = todos
    _saveTodosToStorage()
}




function setNoTodosDisplayShow() {

    const noTodos = ['No todos', 'No Active Todos', 'No Done Todos']

    const strHTMLs = noTodos.map(noTodo => {
        const strHTML = `<li><span>${noTodo}</span></li>`

        return strHTML
    })
    var elTodo = document.querySelector('.todo-list')
    elTodo.innerHTML = strHTMLs.join('')
}