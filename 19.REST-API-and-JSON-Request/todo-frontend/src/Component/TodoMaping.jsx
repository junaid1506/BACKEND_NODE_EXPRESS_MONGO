import { useContext } from "react";
import MainTodo from "./MainTodo";
import { TodoItemsContext } from "../Store/todo-items-store";

const TodoMaping = () => {
  const { todoItems } = useContext(TodoItemsContext);

  return (
    <div className="space-y-3">
      {todoItems.map((todo) => (
        <MainTodo
          key={todo._id}
          todoName={todo.title}
          todoDate={new Date(todo.date).toLocaleDateString()}
          todoId={todo._id}
        />
      ))}
    </div>
  );
};

export default TodoMaping;
