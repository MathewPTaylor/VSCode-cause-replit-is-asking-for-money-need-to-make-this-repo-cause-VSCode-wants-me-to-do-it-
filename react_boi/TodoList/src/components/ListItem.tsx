import { useState } from "react"

interface ListItemProps {
  children: string
}

function ListItem({ children }: ListItemProps) {
  const [isDone, setDone] = useState(false)

  return (
    <div className="listItem">{ children }</div>
  )
}

export default ListItem