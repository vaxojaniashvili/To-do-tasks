import { useState } from "react";
import Button from "../_molecules/Button/Button";

const colors = ["red", "blue", "green", "yellow", "purple"];

export default function FloatingButton({
  addNote,
}: {
  addNote: (color: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        +
      </Button>
      {isOpen && (
        <div className="flex flex-col space-y-2 mt-2">
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => addNote(color)}
              className={`bg-${color}-500 w-10 h-10 rounded-full`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
