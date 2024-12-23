import { SingleItem } from "./SingleItem";

import { useTasks } from "./hooks/useTasks";

export const Items = () => {
  // We get everything we need from our custom hook
  const { tasks, isLoading, isError } = useTasks();

  // Handle loading state
  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  // Handle error state
  if (isError) {
    return <div className="error">Error loading tasks</div>;
  }

  // Show a message if there are no tasks
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks yet. Add one above!</div>;
  }
  return (
    <div className="items">
      {tasks.map((item) => (
        <SingleItem key={item.id} item={item} />
      ))}
    </div>
  );
};
