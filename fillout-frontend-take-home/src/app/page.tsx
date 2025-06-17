'use client'
import FormPages from "@/components/FormPages";
import Menu from "@/components/Menu";
import { FormPagesContext } from "@/store/form-pages-context";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("")
  const [menuPosition, setMenuPosition] = useState({ x: -1000, y: -1000 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [draggedFromIndex, setDraggedFromIndex] = useState(-1)
  const [pages, setPages] = useState([
    { icon: "/info", name: "Info" },
    { icon: "/document", name: "Details" },
    { icon: "/document", name: "Other" },
    { icon: "/check-circle", name: "Ending" }
  ])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as HTMLDivElement)) {
      hideMenu();
    }
  };

  function pageSelected(name: string) {
    hideMenu();
    setSelectedPage(name);
  }

  function showMenu(x: number, y: number) {
    setMenuPosition({ x, y });
  }

  function hideMenu() {
    setMenuPosition({ x: -1000, y: -1000 });
  }

  function handleDrag(draggedFromIndex: number) {
    setDraggedFromIndex(draggedFromIndex);
  }

  function handleDrop(droppedOnIndex: number) {
    setSelectedPage(pages[draggedFromIndex].name);

    console.log(draggedFromIndex, droppedOnIndex)

    console.log(pages[draggedFromIndex].name, pages[droppedOnIndex].name)

    if (draggedFromIndex < droppedOnIndex) {
      setPages((prevPages) => [
        ...prevPages.slice(0, draggedFromIndex),
        ...prevPages.slice(draggedFromIndex + 1, droppedOnIndex + 1),
        prevPages[draggedFromIndex],
        ...prevPages.slice(droppedOnIndex + 1)
      ])
    }

    if (draggedFromIndex > droppedOnIndex) {
      setPages((prevPages) => [
        ...prevPages.slice(0, droppedOnIndex),
        prevPages[draggedFromIndex],
        ...prevPages.slice(droppedOnIndex, draggedFromIndex),
        ...prevPages.slice(draggedFromIndex + 1)
      ])
    }
  }

  const ctxValue = {
    pages: pages,
    setPages: setPages,
    selectedPage: selectedPage,
    pageSelected: pageSelected,
    showMenu: showMenu,
    hideMenu: hideMenu,
    draggingPage: handleDrag,
    droppingPage: handleDrop
  }

  return (
    <FormPagesContext value={ctxValue}>
      <>
        <div className="h-screen flex flex-col">
          <main className="flex-1 flex flex-col justify-around">
            <h1 className="text-center text-9xl">{ctxValue.selectedPage}</h1>
          </main>
          <footer className="flex-none bg-gray-100 py-2">
            <FormPages />
            {<div
              ref={menuRef}
              style={{
                top: menuPosition.y - (menuRef.current?.offsetHeight ? menuRef.current?.offsetHeight : 0),
                left: menuPosition.x,
                boxShadow: "0px 1px 3px 0px #e5e7eb"
              }}
              className={`absolute bg-white rounded-xl border-1 border-gray-200`}
            >
              <Menu />
            </div>}
          </footer>
        </div>
      </>
    </FormPagesContext>
  );
}
