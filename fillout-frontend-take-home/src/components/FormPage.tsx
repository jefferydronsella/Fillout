'use client'
import { FormPagesContext } from "@/store/form-pages-context";
import Image from "next/image";
import { useState, MouseEvent, use } from "react";

export default function FormPage({ icon, name, index }: { icon: string, name: string, index: number }) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const formPagesCtx = use(FormPagesContext);
  const selected = formPagesCtx.selectedPage === name;

  function onContextMenu(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    formPagesCtx.pageSelected(name);
    formPagesCtx.showMenu(event.clientX, event.clientY);
  }

  function handleDragOver(event: React.DragEvent<HTMLElement>) {
    event.preventDefault()
  }

  function handleDrag(event: React.DragEvent<HTMLElement>) {
    event.preventDefault()
    formPagesCtx.draggingPage(index);
  }

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    console.log()
    event.preventDefault()
    formPagesCtx.droppingPage(index);
  }

  return (
    <button type="button"
      draggable
      onContextMenu={onContextMenu}
      onClick={() => { formPagesCtx.pageSelected(name) }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onDrag={handleDrag}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={selected ? { boxShadow: `0px 1px 3px 0px ${focused ? '#2f72e2' : '#e5e7eb'}` } : undefined}
      className={`flex border-2 ${selected && focused ? 'border-[#2f72e2]' : 'border-gray-200'} rounded-lg items-center px-2 ${selected ? ' bg-white' : hover ? ' bg-gray-300' : ' bg-gray-200'}`}
    >
      <Image src={`${icon}${selected ? '-selected' : ''}.png`} alt="form page icon" width="20" height="20" className="h-min" />
      <p className={`ml-2 my-1 ${selected ? 'text-black' : 'text-gray-700'}`}>{name}</p>
      {selected && !focused && <Image src="/menu.png" alt="menu icon" width="20" height="20" className="h-min ml-4" />}
    </button>
  )
}