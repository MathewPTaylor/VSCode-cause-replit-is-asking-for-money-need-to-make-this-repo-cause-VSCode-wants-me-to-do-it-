function handleLoad() {
    const todoBtn = document.getElementById("addBtn");
    const list = document.getElementById("listGroup");

    todoBtn.addEventListener("click", function() {
        let todoInput = document.getElementById("todoInput").value;
        if (todoInput.length <= 0) {
            console.log("LMAOOOO");
            return
        }

        let todoItem = document.createElement("div");
        todoItem.innerHTML = todoInput;
        todoItem.classList.add("list-item");


        let completeBtn = document.createElement("button");
        completeBtn.classList.add("close-btn");
        completeBtn.innerHTML = "Complete";

        completeBtn.addEventListener("click", function() {
            this.parentElement.remove();
        });

        todoItem.appendChild(completeBtn);
        list.insertBefore(todoItem, list.firstChild);
    });
}