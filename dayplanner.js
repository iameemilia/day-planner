document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        clearListBtn.classList.toggle('disabled', tasks.length === 0);

        if (tasks.length === 0) {
            taskList.innerHTML = '<p>Нет задач</p>';
        } else {
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
            <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
            <label for="task${index}">${task.text}</label>
        `;
                taskList.appendChild(listItem);

                document.getElementById(`task${index}`).addEventListener('change', () => {
                    tasks[index].completed = !tasks[index].completed;
                    updateLocalStorage();
                });
            });
        }
    };

    addTaskBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push({ text: newTask, completed: false });
            updateLocalStorage();
            taskInput.value = '';
            renderTasks();
        }
    });

    clearListBtn.addEventListener('click', () => {
        tasks = [];
        updateLocalStorage();
        renderTasks();
    });

    renderTasks();
});
