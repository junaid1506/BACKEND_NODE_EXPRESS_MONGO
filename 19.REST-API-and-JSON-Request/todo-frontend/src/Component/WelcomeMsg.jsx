import { useContext } from "react";
import { TodoItemsContext } from "../Store/todo-items-store";

const WelcomeMsg = () => {
  const { todoItems } = useContext(TodoItemsContext);

  return (
    <>
      {todoItems.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-lg">
          🎉 No tasks today. Enjoy your day!
        </p>
      )}
    </>
  );
};

export default WelcomeMsg;
