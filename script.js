function loadTodo() {
  const todos = JSON.parse(localStorage.getItem("todos")) || { todolist: [] };
  console.log(todos);
  return todos;
}
function refreshTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function addOntodo(inputText) {
  const todos = loadTodo();
  todos.todolist.push(inputText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function addOnpage(inputText) {
  const todolist = document.getElementById("todoItem");
  const todoItem = document.createElement("li");
  todoItem.setAttribute("data-id", inputText.id);
  const textDiv = document.createElement("div");
  if (inputText.isCompleted) {
    textDiv.classList.add("completed");
  }
  textDiv.textContent = inputText.text;
  todoItem.classList.add("todoItem");

  const wrapper = document.createElement("div");
  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";
  editbtn.classList.add("editbtn");
  editbtn.addEventListener("click", editTodo);

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.classList.add("deletebtn");
  deletebtn.addEventListener("click", deleteTodo);

  const completebtn = document.createElement("button");
  completebtn.textContent = inputText.isCompleted ? "Reset" : "Complete";
  completebtn.classList.add("completebtn");
  completebtn.addEventListener("click", toggleTodo);
  wrapper.appendChild(editbtn);
  wrapper.appendChild(deletebtn);
  wrapper.appendChild(completebtn);
  todoItem.appendChild(textDiv);
  todoItem.appendChild(wrapper);
  todolist.appendChild(todoItem);
}
function filterButtonClick(event) {
  const element = event.target;
  const value = element.getAttribute("data-filter");
  const todolist = document.getElementById("todoItem");
  todolist.innerHTML = "";
  const todos = loadTodo();
  if (value == "all") {
    todos.todolist.forEach((element) => {
      addOnpage(element);
    });
  } else if (value == "pending") {
    todos.todolist.forEach((element) => {
      if (element.isCompleted != true) {
        addOnpage(element);
      }
    });
  } else {
    todos.todolist.forEach((element) => {
      if (element.isCompleted == true) {
        addOnpage(element);
      }
    });
  }
}
function editTodo(e) {
  let todoItem = e.target.parentElement.parentElement;
  let todoId = todoItem.getAttribute("data-id");
  let todos = loadTodo();
  let response = prompt("what you want do change now?");
  todos.todolist.forEach((todo) => {
    if (todo.id == todoId) {
      todo.text = response;
    }
  });
  refreshTodos(todos);
  const todolist = document.getElementById("todoItem");
  todolist.innerHTML = "";
  todos.todolist.forEach((todo) => {
    addOnpage(todo);
  });
}

function deleteTodo(e) {
  let todoItem = e.target.parentElement.parentElement;
  let todoId = todoItem.getAttribute("data-id");
  let todos = loadTodo();
  todos.todolist = todos.todolist.filter((todo) => todo.id != todoId);
  refreshTodos(todos);
  const todolist = document.getElementById("todoItem");
  todolist.innerHTML = "";
  todos.todolist.forEach((todo) => {
    addOnpage(todo);
  });
}
function toggleTodo(e) {
  let todoItem = e.target.parentElement.parentElement;
  let todoId = todoItem.getAttribute("data-id");
  let todos = loadTodo();
  todos.todolist.forEach((todo) => {
    if (todo.id == todoId) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  refreshTodos(todos);
  const todolist = document.getElementById("todoItem");
  todolist.innerHTML = "";
  todos.todolist.forEach((todo) => {
    addOnpage(todo);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("inputTodo");
  const todoButton = document.getElementById("inputButton");
  const todoItem = document.getElementById("todoItem");
  const filterBtn = document.getElementsByClassName("filterButton");
  const todos = loadTodo();
  for (const btn of filterBtn) {
    btn.addEventListener("click", filterButtonClick);
  }

  todoButton.addEventListener("click", () => {
    const inputText = inputTodo.value;
    if (inputText == "") {
      alert("Please enter something");
    } else {
      const todos = loadTodo();
      let id = todos.todolist.length;
      addOntodo({ text: inputText, isCompleted: false, id });
      addOnpage({ text: inputText, isCompleted: false, id });
      inputTodo.value = "";
    }
  });

  inputTodo.addEventListener("change", (event) => {
    const inputText = event.target.value;
    event.target.value = inputText.trim();
    console.log(inputText);
  });
  todos.todolist.forEach((element) => {
    addOnpage(element);
  });
});
