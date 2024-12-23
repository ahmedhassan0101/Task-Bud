import { ToastContainer } from "react-toastify";
import { Form } from "./Form";
import { Items } from "./Items";

export default function App() {
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form />
      <Items />
    </section>
  );
}
//  const [items, setItems] = useState<TodoItem[]>(defaultItems);

//   const addItem = (title: string): void => {
//     const newItem: TodoItem = {
//       id: nanoid(),
//       title,
//       isDone: false,
//     };
//     setItems([...items, newItem]);
//     toast.success('Task added successfully');
//   };

//   const removeItem = (id: string): void => {
//     const newItems = items.filter((item) => item.id !== id);
//     setItems(newItems);
//     toast.success('Task removed successfully');
//   };

//   const toggleItem = (id: string): void => {
//     const newItems = items.map((item) =>
//       item.id === id ? { ...item, isDone: !item.isDone } : item
//     );
//     setItems(newItems);
//   };
