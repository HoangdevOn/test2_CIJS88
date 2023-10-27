import { useEffect, useState } from "react";
import "./index.css";

export default function Todo({
  menuActive,
  todo,
  reload,
  setReload,
  deleteTodo,
  setTodoList,
  todoList,
}) {
  const [check, setCheck] = useState(todo.checked);
  const updateLocalStorage = (updatedList) => {
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  function handleCheckbox(event) {
    const isChecked = event.target.checked;
    setCheck(isChecked);

    // Cập nhật trạng thái "checked" cho công việc trong danh sách to-do
    const updatedTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        // Nếu tìm thấy công việc cần cập nhật, thay đổi trạng thái "checked"
        item.checked = isChecked;
        // Lưu trạng thái "checked" mới vào localStorage
        localStorage.setItem(item.id, JSON.stringify({ checked: isChecked }));
      }
      return item;
    });

    // Cập nhật danh sách to-do và lưu vào localStorage
    setTodoList(updatedTodoList);
    updateLocalStorage(updatedTodoList);

    setReload(!reload);
  }

  useEffect(() => {
    // Khi component được tạo ra, kiểm tra xem có trạng thái "checked" lưu trong localStorage không
    const storedChecked = localStorage.getItem(todo.id);
    if (storedChecked) {
      const parsedData = JSON.parse(storedChecked);
      if (parsedData.checked !== check) {
        setCheck(parsedData.checked);
        todo.checked = parsedData.checked;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, reload]);

  return (
    <div className="todoContainer">
      <div className="todo">
        <input
          type="checkbox"
          name="checkbox"
          id={todo.id}
          className="checkbox"
          onChange={handleCheckbox}
          checked={check}
        />

        <label htmlFor={todo.id} className="label">
          {todo.text}
        </label>
      </div>

      {menuActive === "completed" ? (
        <button className="deleteIcon" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      ) : null}
    </div>
  );
}
