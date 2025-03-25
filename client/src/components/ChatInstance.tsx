import "./chatCss.css"

export interface ChatInstanceProps {
  name: string;
}

export default function ChatInstance({name}: ChatInstanceProps) {
  return (
    <div className="chat-instance">
      {name}
    </div>
  )
}