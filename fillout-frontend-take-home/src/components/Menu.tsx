import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <ul className="pb-2">
      <li className="bg-gray-100 px-3 py-1 cursor-default">Settings</li>
      <MenuItem icon="/flag.png" itemText="Set as first page" />
      <MenuItem icon="/rename.png" itemText="Rename" />
      <MenuItem icon="/copy.png" itemText="Copy" />
      <MenuItem icon="/duplicate.png" itemText="Duplicate" />
      <div className="bg-gray-300 h-px mx-3 my-2" />
      <MenuItem icon="/delete.png" itemText="Delete" destructive />
    </ul>
  )
}