import AppName from "./Component/AppName";
import EnterTodo from "./Component/EnterTodo";
import TodoMaping from "./Component/TodoMaping";
import WelcomeMsg from "./Component/WelcomeMsg";

import { useState, useEffect } from "react";
import { TodoItemsContext } from "./Store/todo-items-store";

import {
  completeItemOnServer,
  deleteItemFromServer,
  getItemsFromServer,
} from "./services/itemService";

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

  const toggleComplete = async (_id) => {
    try {
      await completeItemOnServer(_id);
      const newTodo = todoItems.map((todo) => {
        if (todo._id === _id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
      // console.log(newTodo);
      setTodoItems(newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodoItemsContext.Provider
      value={{ todoItems, deleteTodo, toggleComplete }}
    >
      {/* Main Wrapper */}
      <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12 px-4">
        {/* Card Container */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
          <AppName />

          <EnterTodo setTodoItems={setTodoItems} />

          <WelcomeMsg />

          <TodoMaping />
        </div>
      </div>
    </TodoItemsContext.Provider>
  );
}

export default App;
