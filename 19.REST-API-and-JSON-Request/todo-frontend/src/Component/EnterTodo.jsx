import { useContext, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { TodoItemsContext } from "../Store/todo-items-store";
import { addItemToServer } from "../services/itemService";

function EnterTodo({ setTodoItems }) {
  const { todoItems } = useContext(TodoItemsContext);

  const enterNameElement = useRef();
  const enterDateElement = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const serverItem = await addItemToServer(
      enterNameElement.current.value,
      enterDateElement.current.value,
    );

    let newTodo = [serverItem, ...todoItems];
    setTodoItems(newTodo);

    enterNameElement.current.value = "";
    enterDateElement.current.value = "";
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="w-full flex flex-col sm:flex-row gap-3 mb-6 bg-white p-4 rounded-xl shadow"
    >
      {/* Todo Name */}
      <input
        ref={enterNameElement}
        type="text"
        placeholder="What do you want to do?"
        required
        className="
          w-full
          sm:flex-1
          border border-gray-300
          rounded-lg
          px-4 py-2
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* Date */}
      <input
        ref={enterDateElement}
        type="date"
        required
        className="
          w-full
          sm:w-40
          border border-gray-300
          rounded-lg
          px-3 py-2
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* Button */}
      <button
        type="submit"
        className="
          w-full sm:w-auto
          bg-green-500 hover:bg-green-600
          text-white
          px-4 py-2
          rounded-lg
          flex items-center justify-center gap-2
          transition
          font-medium
        "
      >
        <IoAddCircleOutline size={22} />
        Add
      </button>
    </form>
  );
}

export default EnterTodo;
