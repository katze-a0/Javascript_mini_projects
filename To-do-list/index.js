

let tasks = [];

// Load tasks from localStorage
const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        updateTaskList();
        updateProgress();
    }
};

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateProgress();
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({
            id: Date.now(),
            text: text,
            completed: false
        });

        taskInput.value = '';
        saveTasks();
        updateTaskList();
    } else {
        alert('Please enter a task!');
    }
};

const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    updateTaskList();
};

const toggleTask = (taskId) => {
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    updateTaskList();
};

const editTask = (taskId) => {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskText = taskElement.querySelector('p');
    const currentText = taskText.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';

    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText) {
            tasks = tasks.map(task =>
                task.id === taskId ? { ...task, text: newText } : task
            );
            saveTasks();
            updateTaskList();
        }
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });

    taskText.replaceWith(input);
    input.focus();
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    document.getElementById('task-stats').textContent = `${completedTasks}/${totalTasks}`;
    
    const progressBar = document.getElementById('progress');
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-task-id', task.id);
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p class="${task.completed ? 'completed' : ''}">${task.text}</p>
                </div>
                <div class="icons">
                    <button class="icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;

        // Add event listeners
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const editBtn = listItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(listItem);
    });
};

// Event Listeners
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);