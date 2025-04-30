document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  //   if (event.target.dataset.type === "edit") {
  //     const id = event.target.dataset.id;
  //     const currentTitle = event.target
  //       .closest("li")
  //       .firstChild.textContent.trim();
  //     const newTitle = prompt("Введите новое название", currentTitle);

  //     if (newTitle) {
  //       edit(id, newTitle).then(() => {
  //         event.target.closest("li").firstChild.textContent = newTitle;
  //       });
  //     }
  //   }
  // });

  if (event.target.dataset.type === "edit") {
    const button = event.target;
    const id = button.dataset.id;
    const li = button.closest("li");

    const titleSpan = li.querySelector(".note-title");
    const currentTitle = titleSpan.textContent.trim();

    const newTitle = prompt("Введите новое название", currentTitle);

    if (newTitle && newTitle !== currentTitle) {
      edit(id, newTitle).then(() => {
        titleSpan.textContent = newTitle;
        // обновим data-title, если используешь
        button.dataset.title = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
