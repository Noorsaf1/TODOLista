class Todo {
    constructor(text, done = false) {
        this.text = text;
        this.done = done;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const newTodo = document.getElementById("newTodo");
    const todoList = document.getElementById("todoList");

    const todos = [
        new Todo("Köpa mjölk"),
        new Todo("Städa rummet"),
        new Todo("Betala räkningar"),
    ];

    const renderTodos = () => {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("li");
            todoItem.className = `list-group-item d-flex justify-content-between align-items-center todo-item${todo.done ? " done" : ""}`;
            
            // Todo text
            const todoText = document.createElement("span");
            todoText.innerText = todo.text;
            todoText.addEventListener("click", () => {
                todos[index].done = !todos[index].done;
                renderTodos();
            });
            todoItem.appendChild(todoText);

            // Edit and remove buttons container
            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "btn-group";
            todoItem.appendChild(buttonsContainer);

            // Edit button
            const editButton = document.createElement("button");
            editButton.className = "btn btn-sm btn-warning";
            editButton.innerText = "Redigera";
            editButton.addEventListener("click", () => {
                const newText = prompt("Redigera uppgiften:", todo.text);
                if (newText && newText.trim() !== "") {
                    todos[index].text = newText.trim();
                    renderTodos();
                }
            });
            buttonsContainer.appendChild(editButton);

            // Remove button
            const removeButton = document.createElement("button");
            removeButton.className = "btn btn-sm btn-danger";
            removeButton.innerText = "Ta bort";
            removeButton.addEventListener("click", () => {
                if (confirm("Vill du verkligen ta bort uppgiften?")) {
                    todos.splice(index, 1);
                    renderTodos();
                }
            });
            buttonsContainer.appendChild(removeButton);

            todoList.appendChild(todoItem);
        });
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = newTodo.value.trim();
        if (text) {
            todos.push(new Todo(text));
            newTodo.value = "";
            renderTodos();
        }
    });

    renderTodos();
});
