'use client'
import { FormPagesContext } from "@/store/form-pages-context";
import Image from "next/image";
import { useContext, useState } from "react";

export default function AddButton() {
  const formPagesCtx = useContext(FormPagesContext)
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={() => {
        const name = `New Page ${formPagesCtx.pages.length + 1}`;
        formPagesCtx.setPages((prevPages) => [...prevPages, {
          icon: "/document",
          name: name
        }]);
        formPagesCtx.pageSelected(name);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      className={`flex border-2 ${hover ? 'border-[#2f72e2]' : 'border-gray-200'} rounded-lg items-center px-2 bg-white`}
    >
      <Image src={"/plus.png"} alt="add page icon" width="20" height="20" className="h-min" />
      <p className="ml-2 my-1">Add page</p>
    </button>
  )
}