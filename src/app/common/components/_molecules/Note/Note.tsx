import { useState, useEffect } from "react";

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
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
        <input
          key={index}
          value={task}
          onChange={(e) => {
            const newTasks = [...tasks];
            newTasks[index] = e.target.value;
            setTasks(newTasks);
          }}
          className="mb-2 p-2 border border-gray-300 rounded"
          placeholder="New task..."
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Add Task
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-2 py-1 rounded ml-2"
      >
        Save
      </button>

      <ul className="mt-2">
        {taskList.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className={completedTasks[index] ? "line-through" : ""}>
              {index + 1}. {task}
            </span>
            <button
              onClick={() => toggleComplete(index)}
              className="ml-4 text-xs text-white"
            >
              {completedTasks[index] ? "Completed" : "Complete"}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => deleteNote(id)}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Delete
      </button>

      <button
        onClick={downloadNote}
        className="absolute top-2 right-2 bg-gray-300 p-2 rounded"
      >
        📥
      </button>
    </div>
  );
}
