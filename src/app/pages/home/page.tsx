"use client";
import { useState, useEffect } from "react";
import Note from "@/app/common/components/_molecules/Note/Note";
import FloatingButton from "@/app/common/components/_organisms/FloatingButton";

export default function HomePage() {
  const [notes, setNotes] = useState<{ id: string; color: string }[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (color: string) => {
    const id = Date.now().toString();
    const newNote = { id, color };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    if (updatedNotes.length === 0) {
      localStorage.removeItem("notes");
    }
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
