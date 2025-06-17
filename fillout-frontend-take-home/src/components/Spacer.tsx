'use client'
import { FormPagesContext } from "@/store/form-pages-context";
import Image from "next/image";
import { useContext, useState } from "react";

export default function Spacer({ index }: { index: number }) {
  const formPagesCtx = useContext(FormPagesContext)
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={() => {
        const name = `New Page ${formPagesCtx.pages.length + 1}`;
        formPagesCtx.setPages((prevPages) => [
          ...prevPages.slice(0, index + 1),
          {
            icon: "/document",
            name: name
          },
          ...prevPages.slice(index + 1)
        ]);
        formPagesCtx.pageSelected(name);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
      onMouseEnter={() => { setHover(index < formPagesCtx.pages.length - 1) }}
      onMouseLeave={() => { setHover(false) }}
      className="mx-0 h-4 flex items-center">
      <Image src={"/spacer.png"} alt="spacer" width="30" height="3" className="h-min" />
      {hover &&
        <Image src={"/plus-circle.png"} alt="add page" width="30" height="3" className="h-min" />
      }
      {hover &&
        <Image src={"/spacer.png"} alt="spacer" width="30" height="5" className="h-min" />
      }
    </div>
  )
}