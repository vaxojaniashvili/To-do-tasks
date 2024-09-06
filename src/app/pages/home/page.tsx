"use client";
import Note from "@/app/common/components/_molecules/Note/Note";
import FloatingButton from "@/app/common/components/_organisms/FloatingButton";
import { useState } from "react";

export default function HomePage() {
  const [notes, setNotes] = useState<{ id: string; color: string }[]>([]);

  const addNote = (color: string) => {
    const id = Date.now().toString();
    setNotes([...notes, { id, color }]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <FloatingButton addNote={addNote} />
      <div className="flex flex-wrap">
        {notes.map((note) => (
          <Note
            key={note.id}
            color={note.color}
            id={note.id}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}
