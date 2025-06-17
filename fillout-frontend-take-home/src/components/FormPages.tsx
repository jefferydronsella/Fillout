import FormPage from "./FormPage";
import { ReactNode, useContext, useEffect } from "react";
import Spacer from "./Spacer"
import AddButton from "./AddButton";
import { FormPagesContext } from "@/store/form-pages-context";

export default function FormPages() {
  const formPagesCtx = useContext(FormPagesContext);
  const renderedPages: ReactNode[] = [];

  useEffect(() => {
    if (formPagesCtx.selectedPage === "") {
      formPagesCtx.pageSelected(formPagesCtx.pages[0].name)
    }
  }, [])

  formPagesCtx.pages.forEach((page, index) => {
    renderedPages.push(
      <FormPage icon={page.icon} name={page.name} key={page.name} index={index} />
    )
    renderedPages.push(
      <Spacer key={index} index={index} />
    )
  })
  renderedPages.push(
    <AddButton key="Add Button" />
  )

  return (
    <div className="flex justify-center items-center">
      {renderedPages}
    </div>
  )
}