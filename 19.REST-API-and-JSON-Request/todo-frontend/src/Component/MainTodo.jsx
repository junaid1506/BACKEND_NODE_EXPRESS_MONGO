import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { TodoItemsContext } from "../Store/todo-items-store";

function MainTodo({ todoName, todoDate, todoId, completed }) {
  const { deleteTodo, toggleComplete } = useContext(TodoItemsContext);

  return (
    <div
      className="
        w-full
        grid grid-cols-[auto_1fr_auto]
        items-center
        gap-4
        bg-white
        px-5 py-4
        rounded-xl
        shadow-sm
        mb-3
        hover:shadow-md
        transition
      "
    >
      {/* Complete Button */}
      <button
        onClick={() => toggleComplete(todoId)}
        className={`
          h-9 w-9
          flex items-center justify-center
          rounded-full
          border
          transition
          ${
            completed
              ? "bg-green-500 text-white border-green-500"
              : "border-gray-300 text-gray-400 hover:bg-green-100"
          }
        `}
        aria-label="Mark Complete"
      >
        <FaCheck size={14} />
      </button>

      {/* Todo Content */}
      <div className="min-w-0">
        <h3
          className={`font-semibold text-base truncate ${
            completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todoName}
        </h3>

        <p
          className={`text-sm mt-1 ${
            completed ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {todoDate}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => deleteTodo(todoId)}
        className="
          h-10 w-10
          flex items-center justify-center
          rounded-full
          text-red-500
          hover:text-white
          hover:bg-red-500
          transition
        "
        aria-label="Delete Todo"
      >
        <MdDelete size={20} />
      </button>
    </div>
  );
}

export default MainTodo;
