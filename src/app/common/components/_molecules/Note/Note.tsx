import { useState, useEffect, KeyboardEvent } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Ul from "../Ul/Ul";
import Li from "../Li/Li";
import Span from "../Span/Span";

interface NoteProps {
  color: string;
  id: string;
  deleteNote: (id: string) => void;
}

export default function Note({ color, id, deleteNote }: NoteProps) {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);

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
      alert("შენახვამდე შეავსე ტასკები");
    } else {
      setTaskList([...tasks]);
      setCompletedTasks([...completedTasks]);
      localStorage.setItem(`tasks-${id}`, JSON.stringify(tasks));
      localStorage.setItem(
        `completedTasks-${id}`,
        JSON.stringify(completedTasks)
      );
    }
  };

  const addTask = () => {
    if (tasks[tasks.length - 1].trim() !== "") {
      setTasks([...tasks, ""]);
      setCompletedTasks([...completedTasks, false]);
    } else {
      alert("შეავსეთ თასქი");
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
      className="p-4 rounded-lg shadow-md m-2"
      style={{ backgroundColor: color }}
    >
      {tasks.map((task, index) => (
        <Input
          key={index}
          value={task}
          onChange={(e: { target: { value: string } }) => {
            const newTasks = [...tasks];
            newTasks[index] = e.target.value;
            setTasks(newTasks);
          }}
          className="mb-2 p-2 border border-gray-300 rounded"
          placeholder="New task..."
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        />
      ))}
      <Button
        onClick={addTask}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Add task
      </Button>
      <Button
        onClick={handleSave}
        className="bg-green-500 text-white px-2 py-1 rounded ml-2"
      >
        Save
      </Button>

      <Ul className="mt-2">
        {taskList.map((task, index) => (
          <Li key={index} className="flex justify-between items-center">
            <Span className={completedTasks[index] ? "line-through" : ""}>
              {index + 1}. {task}
            </Span>
            <Button
              onClick={() => toggleComplete(index)}
              className="ml-4 text-xs text-white"
            >
              {completedTasks[index] ? "Completed" : "Not completed"}
            </Button>
          </Li>
        ))}
      </Ul>

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
        გადმოწერა
      </Button>
    </div>
  );
}
