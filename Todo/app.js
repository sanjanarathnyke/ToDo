// TypeScript code for Todo App
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// DOM Elements
var todoInput = document.querySelector(".form-control");
var addTodoForm = document.querySelector("form");
var todoList = document.querySelector(".todo-list");
var filters = document.querySelectorAll(".btn-group button");
var summary = document.querySelector(".mt-4 span");
var clearCompletedButton = document.querySelector(".mt-4 button");
// State
var todos = [];
var filter = "all";
// Functions
function renderTodos() {
    todoList.innerHTML = "";
    var filteredTodos = todos.filter(function (todo) {
        if (filter === "active")
            return !todo.completed;
        if (filter === "completed")
            return todo.completed;
        return true;
    });
    filteredTodos.forEach(function (todo) {
        var todoCard = document.createElement("div");
        todoCard.className = "card mb-2";
        todoCard.innerHTML = "\n        <div class=\"card-body d-flex justify-content-between align-items-center\">\n          <div>\n            <input type=\"checkbox\" class=\"form-check-input me-2\" ".concat(todo.completed ? "checked" : "", ">\n            <span class=\"").concat(todo.completed ? "text-decoration-line-through text-muted" : "", "\">").concat(todo.text, "</span>\n          </div>\n          <div class=\"btn-group\">\n            <button class=\"btn btn-sm btn-outline-primary\"><i class=\"fas fa-edit\"></i></button>\n            <button class=\"btn btn-sm btn-outline-danger\"><i class=\"fas fa-trash\"></i></button>\n          </div>\n        </div>\n      ");
        // Event Listeners
        var checkbox = todoCard.querySelector("input[type='checkbox']");
        var editButton = todoCard.querySelector(".btn-outline-primary");
        var deleteButton = todoCard.querySelector(".btn-outline-danger");
        checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener("change", function () { return toggleCompletion(todo.id); });
        editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener("click", function () { return editTodoText(todo.id); });
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function () { return deleteTodoItem(todo.id); });
        todoList.appendChild(todoCard);
    });
    updateSummary();
}
function addTodoItem(event) {
    event.preventDefault();
    if (todoInput.value.trim() === "")
        return;
    var newTodo = {
        id: Date.now(),
        text: todoInput.value.trim(),
        completed: false,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
}
function toggleCompletion(id) {
    todos = todos.map(function (todo) { return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo; });
    renderTodos();
}
function editTodoText(id) {
    var newText = prompt("Edit your task:");
    if (newText) {
        todos = todos.map(function (todo) { return todo.id === id ? __assign(__assign({}, todo), { text: newText }) : todo; });
        renderTodos();
    }
}
function deleteTodoItem(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
function updateSummary() {
    var activeCount = todos.filter(function (todo) { return !todo.completed; }).length;
    summary.textContent = "".concat(activeCount, " items left");
}
function clearCompletedTodos() {
    todos = todos.filter(function (todo) { return !todo.completed; });
    renderTodos();
}
// Event Listeners
addTodoForm === null || addTodoForm === void 0 ? void 0 : addTodoForm.addEventListener("submit", addTodoItem);
filters.forEach(function (button) { return button.addEventListener("click", function () {
    filter = button.textContent.toLowerCase();
    filters.forEach(function (btn) { return btn.classList.remove("active"); });
    button.classList.add("active");
    renderTodos();
}); });
clearCompletedButton === null || clearCompletedButton === void 0 ? void 0 : clearCompletedButton.addEventListener("click", clearCompletedTodos);
// Initial Render
renderTodos();
