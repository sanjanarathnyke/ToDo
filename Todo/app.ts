// TypeScript code for Todo App

// Interfaces
interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  // DOM Elements
  const todoInput = document.querySelector<HTMLInputElement>(".form-control");
  const addTodoForm = document.querySelector<HTMLFormElement>("form");
  const todoList = document.querySelector<HTMLDivElement>(".todo-list");
  const filters = document.querySelectorAll<HTMLButtonElement>(".btn-group button");
  const summary = document.querySelector<HTMLSpanElement>(".mt-4 span");
  const clearCompletedButton = document.querySelector<HTMLButtonElement>(".mt-4 button");
  
  // State
  let todos: Todo[] = [];
  let filter: "all" | "active" | "completed" = "all";
  
  // Functions
  function renderTodos() {
    todoList!.innerHTML = "";
    const filteredTodos = todos.filter(todo => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  
    filteredTodos.forEach(todo => {
      const todoCard = document.createElement("div");
      todoCard.className = "card mb-2";
      todoCard.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" class="form-check-input me-2" ${todo.completed ? "checked" : ""}>
            <span class="${todo.completed ? "text-decoration-line-through text-muted" : ""}">${todo.text}</span>
          </div>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      // Event Listeners
      const checkbox = todoCard.querySelector<HTMLInputElement>("input[type='checkbox']");
      const editButton = todoCard.querySelector<HTMLButtonElement>(".btn-outline-primary");
      const deleteButton = todoCard.querySelector<HTMLButtonElement>(".btn-outline-danger");
  
      checkbox?.addEventListener("change", () => toggleCompletion(todo.id));
      editButton?.addEventListener("click", () => editTodoText(todo.id));
      deleteButton?.addEventListener("click", () => deleteTodoItem(todo.id));
  
      todoList!.appendChild(todoCard);
    });
  
    updateSummary();
  }
  
  function addTodoItem(event: Event) {
    event.preventDefault();
    if (todoInput!.value.trim() === "") return;
  
    const newTodo: Todo = {
      id: Date.now(),
      text: todoInput!.value.trim(),
      completed: false,
    };
    todos.push(newTodo);
    todoInput!.value = "";
    renderTodos();
  }
  
  function toggleCompletion(id: number) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    renderTodos();
  }
  
  function editTodoText(id: number) {
    const newText = prompt("Edit your task:");
    if (newText) {
      todos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
      renderTodos();
    }
  }
  
  function deleteTodoItem(id: number) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
  
  function updateSummary() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    summary!.textContent = `${activeCount} items left`;
  }
  
  function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
  }
  
  // Event Listeners
  addTodoForm?.addEventListener("submit", addTodoItem);
  filters.forEach(button => button.addEventListener("click", () => {
    filter = button.textContent!.toLowerCase() as "all" | "active" | "completed";
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderTodos();
  }));
  clearCompletedButton?.addEventListener("click", clearCompletedTodos);
  
  // Initial Render
  renderTodos();
  