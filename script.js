const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const statusDiv = document.getElementById("status");

// Fetch initial todos
async function fetchTodos() {
  try {
    const res = await fetch("https://dummyjson.com/todos");
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();

    // Clear previous list (optional)
    taskList.innerHTML = "";

    // Display first 10 todos for brevity
    data.todos.slice(0, 10).forEach(todo => {
      addTaskToDOM(todo.todo, todo.completed);
    });

   
  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Error loading todos. Please try again.";
  }
}


// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTaskToDOM(taskText, false);
  taskInput.value = "";
}

// Add task to DOM
function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  // Event listeners
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

// Add event listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize
fetchTodos();
