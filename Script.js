// Get HTML Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const themeToggle = document.getElementById("themeToggle");

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ---------------------------
// Save Tasks to Local Storage
// ---------------------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------------------------
// Update Task Counter
// ---------------------------
function updateTaskCounter() {
    taskCount.textContent = tasks.length;
}

// ---------------------------
// Show / Hide Empty Message
// ---------------------------
function checkEmptyState() {

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// ---------------------------
// Render Tasks on Screen
// ---------------------------
function renderTasks() {

    // Clear previous tasks
    taskList.innerHTML = "";

    // Loop through tasks
    tasks.forEach((task, index) => {

        // Create list item
        const li = document.createElement("li");
        li.classList.add("task-item");

        // Task Text
        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        // If completed, add completed class
        if (task.completed) {
            span.classList.add("completed");
        }

        // Toggle completed status
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        // Delete task
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        // Add elements to list item
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add list item to task list
        taskList.appendChild(li);
    });

    // Update UI
    updateTaskCounter();
    checkEmptyState();
}

// ---------------------------
// Add New Task
// ---------------------------
function addTask() {

    // Get input value
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task object
    const task = {
        text: taskText,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Save and render
    saveTasks();
    renderTasks();

    // Clear input
    taskInput.value = "";
}

// ---------------------------
// Add Task Button Click
// ---------------------------
addTaskBtn.addEventListener("click", addTask);

// ---------------------------
// Press Enter to Add Task
// ---------------------------
taskInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        addTask();
    }
});

// ---------------------------
// Dark Mode Toggle
// ---------------------------
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Save theme preference
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );
});

// ---------------------------
// Load Saved Theme
// ---------------------------
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// ---------------------------
// Initial Render
// ---------------------------
renderTasks();
