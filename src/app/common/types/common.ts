import { ChangeEvent } from "react";

export interface ButtonType {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  key?: string | number;
  style?: React.CSSProperties;
}
export interface InputFieldTypes {
  type?: string;
  className?: string;
  key?: string | number;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface UlTypes {
  children?: React.ReactNode;
  className?: string;
}
export interface LiTypes {
  children?: React.ReactNode;
  className?: string;
  key?: string | number;
}

export interface SpanTypes {
  children?: React.ReactNode;
  className?: string;
}
export interface NoteTypes {
  id: string;
  color: string;
}

export interface NoteProps {
  color: string;
  id: string;
  deleteNote: (id: string) => void;
}
