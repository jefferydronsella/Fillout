import Image from "next/image";

export default function MenuItem({icon, itemText, destructive = false}: {icon: string, itemText: string, destructive?: boolean}) {
  return (
    <li className="flex py-1 pl-3 pr-10 cursor-pointer">
      <Image src={icon} alt="menu item icon" height="20" width="20" />
      <p className={`pl-2 ${destructive ? 'text-[#EF494F]' : ''}`}>{itemText}</p>
    </li>
  )
}