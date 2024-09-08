import { useDrag, useDrop } from "react-dnd";
import { useRef, useState, useEffect } from "react";
import Button from "../Button/Button";
import { NoteProps } from "@/app/common/types";
import { InputField } from "..";

const ItemTypes = {
  NOTE: "note",
};

export default function Note({
  color,
  id,
  deleteNote,
  index,
  moveNote
}: NoteProps & { index: number; moveNote: (dragIndex: number, hoverIndex: number) => void }) {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NOTE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.NOTE,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveNote(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks-${id}`);
    const savedCompleted = localStorage.getItem(`completedTasks-${id}`);

    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
      setTasks(JSON.parse(savedTasks));
    }

    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
  }, [id]);

  const handleSave = () => {
    if (tasks.some((task) => task.trim() === "")) {
      alert("Please fill in all tasks before saving.");
    } else {
      setTaskList([...tasks]);
      setCompletedTasks([...completedTasks]);
      localStorage.setItem(`tasks-${id}`, JSON.stringify(tasks));
      localStorage.setItem(`completedTasks-${id}`, JSON.stringify(completedTasks));
    }
  };

  const addTask = () => {
    if (tasks[tasks.length - 1].trim() !== "") {
      setTasks([...tasks, ""]);
      setCompletedTasks([...completedTasks, false]);
    } else {
      alert("Please fill in the task before adding a new one.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const toggleComplete = (index: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const downloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([taskList.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div
      ref={ref}
      className="p-4 rounded-lg shadow-md m-2"
      style={{ backgroundColor: color, opacity }}
    >
      {tasks.map((task, index) => (
        <InputField
          key={index}
          value={task}
          onChange={(e: { target: { value: string } }) => {
            const newTasks = [...tasks];
            newTasks[index] = e.target.value;
            setTasks(newTasks);
          }}
          className="mb-2 p-2 border border-gray-300 rounded"
          placeholder="New task..."
          onKeyDown={handleKeyDown}
        />
      ))}
      <Button
        onClick={addTask}
        className="bg-blue-500 text-white mx-2 px-2 py-1 rounded"
      >
        Add task
      </Button>
      <Button
        onClick={handleSave}
        className="bg-green-500 text-white px-2 py-1 rounded ml-2"
      >
        Save
      </Button>

      <ul className="mt-2">
        {taskList.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className={completedTasks[index] ? "line-through" : ""}>
              {index + 1}. {task}
            </span>
            <Button
              onClick={() => toggleComplete(index)}
              className="ml-4 text-xs text-white"
            >
              {completedTasks[index] ? "Completed" : "Not completed"}
            </Button>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => deleteNote(id)}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Delete
      </Button>
      <Button
        onClick={downloadNote}
        className="absolute top-2 right-2 bg-gray-300 p-2 rounded"
      >
        Download
      </Button>
    </div>
  );
}
