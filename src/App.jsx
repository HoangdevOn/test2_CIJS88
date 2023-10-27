import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

export default function Home() {
  const [menuActive, setMenuActive] = useState("all");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [reload, setReload] = useState(false);

  const updateLocalStorage = (updatedList) => {
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, [reload]);

  function handleChange(event) {
    setTodo(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    const item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false,
    };

    setTodoList((prev) => {
      const updatedList = [...prev, item];
      updateLocalStorage(updatedList); 
      return updatedList;
    });
    setTodo("");
  }

  function deleteTodo(id) {
    const remainingItems = todoList.filter((item) => {
      return item.id !== id;
    });

    setTodoList(remainingItems);
    updateLocalStorage(remainingItems); 
  }

  function deleteCompleted() {
    const remainingItems = todoList.filter((item) => {
      return item.checked !== true;
    });

    setTodoList(remainingItems);
    updateLocalStorage(remainingItems); 
    setMenuActive("all");
  }

  return (
    <>
      <header className="header">
        <h1 className="title">#todo</h1>
      </header>

      <main className="main">
        <div className="menu">
          <div
            className="menuOption"
            onClick={() => {
              setMenuActive("all");
            }}
          >
            <span>All</span>
            <div
              className={menuActive === "all" ? "underlineActive" : "underline"}
            ></div>
          </div>

          <div
            className="menuOption"
            onClick={() => {
              setMenuActive("active");
            }}
          >
            <span>Active</span>
            <div
              className={
                menuActive === "active" ? "underlineActive" : "underline"
              }
            ></div>
          </div>

          <div
            className="menuOption"
            onClick={() => {
              setMenuActive("completed");
            }}
          >
            <span>Completed</span>
            <div
              className={
                menuActive === "completed" ? "underlineActive" : "underline"
              }
            ></div>
          </div>
        </div>
        <hr className="hr" />
        {menuActive !== "completed" ? (
          <form onSubmit={addTodo}>
            <div className="inputContainer">
              <input
                type="text"
                name="todo"
                placeholder="add details"
                className="input"
                onChange={handleChange}
                value={todo}
              />

              <button
                type="submit"
                className="addButton"
                disabled={todo ? false : true}
              >
                Add
              </button>
            </div>
          </form>
        ) : null}

        {todoList
          ? todoList.map((item) => {
              if (menuActive === "completed" && !item.checked) {
                return;
              } else if (menuActive === "active" && item.checked) {
                return;
              }

              return (
                <Todo
                  key={item.id}
                  menuActive={menuActive}
                  todo={item}
                  reload={reload}
                  setReload={setReload}
                  deleteTodo={deleteTodo}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              );
            })
          : null}

        {menuActive === "completed" ? (
          <div className="deleteContainer">
            <button
              type="button"
              className="deleteButton"
              onClick={deleteCompleted}
            >
              <span>delete all</span>
            </button>
          </div>
        ) : null}
      </main>
    </>
  );
}
