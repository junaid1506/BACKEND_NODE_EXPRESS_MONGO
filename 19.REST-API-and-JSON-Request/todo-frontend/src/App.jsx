import AppName from "./Component/AppName";
import EnterTodo from "./Component/EnterTodo";
import "./App.css";
import TodoMaping from "./Component/TodoMaping";
import { useState } from "react";
import WelcomeMsg from "./Component/WelcomeMsg";
import { TodoItemsContext } from "./Store/todo-items-store";
import { deleteItemFromServer, getItemsFromServer } from "./services/itemService";
import { useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const loadTodoItems = async () => {
    try {
      const data = await getItemsFromServer();
      setTodoItems(data);
    } catch (error) {
      console.error("Error loading todo items:", error);
    }
  };
  useEffect(() => {
    loadTodoItems();
  }, []);

  const deleteTodo = async (_id) => {
    try {
      await deleteItemFromServer(_id);
      const newTodo = todoItems.filter((item) => item._id !== _id);
      setTodoItems(newTodo);
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };
  return (
    <>
      <TodoItemsContext.Provider
        value={{ todoItems: todoItems, deleteTodo: deleteTodo }}
      >
        <center className="todocontainer">
          <AppName />
          <div className="center">
            <EnterTodo setTodoItems={setTodoItems} />
            <WelcomeMsg />
            <TodoMaping />
          </div>
        </center>
      </TodoItemsContext.Provider>
    </>
  );
}

export default App;
