import { TodoItem } from "./types";
import { useTasks } from "./hooks/useTasks";

interface SingleItemProps {
  item: TodoItem;
}

export const SingleItem = ({ item }: SingleItemProps): JSX.Element => {
  const { updateTask, deleteTask } = useTasks();

  const handleToggle = () => {
    updateTask({ id: item.id, isDone: !item.isDone });
  };

  const handleDelete = () => {
    deleteTask(item.id);
  };

  return (
    <div className="single-item">
      <input type="checkbox" checked={item.isDone} onChange={handleToggle} />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone ? "line-through" : "none",
        }}
      >
        {item.title}
      </p>
      <button className="btn remove-btn" type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};
