import { useState, FormEvent } from "react";
import { useTasks } from "./hooks/useTasks";

export const Form = () => {
  const [newItemName, setNewItemName] = useState<string>("");
  const { createTask } = useTasks();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      return;
    }
    createTask(newItemName);
    setNewItemName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit" className="btn">
          add task
        </button>
      </div>
    </form>
  );
};
