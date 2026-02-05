import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { TodoItemsContext } from "../Store/todo-items-store";

function MainTodo({ todoName, todoDate, todoId }) {
  const { deleteTodo } = useContext(TodoItemsContext);

  return (
    <div
      className="
        w-full
        grid grid-cols-[1fr_auto]
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
      {/* Left Content */}
      <div className="min-w-0">
        <h3 className="font-semibold text-base text-gray-800 truncate">
          {todoName}
        </h3>

        <p className="text-sm text-gray-500 mt-1">{todoDate}</p>
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
