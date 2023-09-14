// Array para almacenar las tareas
let tasks = [];

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Función para guardar tareas en el almacenamiento local
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para renderizar las tareas en el DOM
function renderTasks() {
    const taskList = $('#taskList');
    taskList.empty();

    tasks.forEach(task => {
        const listItem = $(`<li class="list-group-item">${task.text}</li>`);
        if (task.completed) {
            listItem.addClass('completed');
        }

        const deleteButton = $('<button class="btn btn-danger btn-sm float-right">Eliminar</button>');
        deleteButton.click(() => {
            deleteTask(task.id);
        });

        listItem.append(deleteButton);
        taskList.append(listItem);
    });
}

// Función para agregar una nueva tarea
function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

// Función para eliminar una tarea
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Función para marcar una tarea como completada o no completada
function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Cargar tareas al inicio
loadTasks();

// Agregar una nueva tarea al hacer clic en el botón "Agregar"
$('#addTask').click(() => {
    const newTaskInput = $('#newTask');
    const text = newTaskInput.val().trim();
    if (text) {
        addTask(text);
        newTaskInput.val('');
    }
});

// Marcar una tarea como completada o no completada al hacer clic en ella
$('#taskList').on('click', 'li', function() {
    const id = parseInt($(this).attr('data-id'));
    toggleTaskCompletion(id);
});

