import { PageData } from "@/models/PageData";
import { createContext, Dispatch, SetStateAction } from "react";

interface FormPagesContextType {
  pages: PageData[];
  setPages: Dispatch<SetStateAction<{
    icon: string;
    name: string;
}[]>>;
  selectedPage: string;
  pageSelected: (name: string) => void;
  showMenu: (x: number, y: number) => void;
  hideMenu: () => void;
  draggingPage: (draggedFromIndex: number) => void;
  droppingPage: (droppedOnIndex: number) => void;
}

export const FormPagesContext = createContext<FormPagesContextType>({
  pages: [],
  setPages: () => {},
  selectedPage: "",
  pageSelected: () => {},
  showMenu: () => {},
  hideMenu: () => {},
  draggingPage: () => {},
  droppingPage: () => {}
});
