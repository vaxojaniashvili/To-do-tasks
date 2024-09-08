"use client"
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Note from "@/app/common/components/_molecules/tasks/TaskItems";
import { NoteTypes } from "@/app/common/types";
import AddTasksButton from "@/app/common/components/_organisms/AddTasksButton";

export default function HomePage() {
  const [notes, setNotes] = useState<NoteTypes[]>([]);

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

  const moveNote = (dragIndex: number, hoverIndex: number) => {
    const draggedNote = notes[dragIndex];
    const updatedNotes = [...notes];
    updatedNotes.splice(dragIndex, 1);
    updatedNotes.splice(hoverIndex, 0, draggedNote);
    setNotes(updatedNotes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AddTasksButton addNote={addNote} />
      <div className="flex flex-wrap">
        {notes.map((note, index) => (
          <Note
            key={note.id}
            color={note.color}
            id={note.id}
            index={index}
            moveNote={moveNote}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </DndProvider>
  );
}
