import { ReactNode } from 'react';

import './Message.scss';


interface MessageProps {
  type?: 'error' | 'warning'
  children?: ReactNode
}

const Message = ({ type, children }: MessageProps) => {
  return (
    <p className={`message ${type}`}>{children}</p>
  )
}

export default Message;
