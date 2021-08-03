import { FC, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { wsURL } from '../../constants';
import { Message, MessageData, MessageRole } from '../../types/Chat';
import styles from './styles.module.scss';
import ClientMessageItem from './ClientMessageItem';
import ServerMessageItem from './ServerMessageItem';

export interface MessageProps {
  content: string;
}

const messageMap: Record<MessageRole, FC<MessageProps>> = {
  [MessageRole.Client]: ClientMessageItem,
  [MessageRole.Server]: ServerMessageItem,
}

const ChatRoom: FC = () => {
  const socketRef = useRef<Socket>();
  const chatRef = useRef<HTMLUListElement | null>(null);

  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const initWs = () => {
    socketRef.current = io(wsURL, { path: '/chat/socket.io' });
    socketRef.current.on('connect', function() {
      console.log('WS 已连接');

      if (socketRef.current) {
        sendMsg('你好');
      }
    });
    socketRef.current.on('serverToClient', function(data) {
      console.log('serverToClient', data);
    });
    socketRef.current.on('exception', function(data) {
      console.error('WS 异常', data);
    });
    socketRef.current.on('disconnect', function() {
      console.log('WS 已断开连接');
    });
  }

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current?.close();
    }
  }

  const sendMsg = (content: string) => {
    const newMessages = [
      ...messages,
      { role: MessageRole.Client, data: { content } }
    ]

    setMessages(newMessages);

    if (socketRef.current) {
      socketRef.current?.emit('clientToServer', { content }, (serverData: MessageData) => {
        console.log('服务器消息:', serverData);
        setMessages([
          ...newMessages,
          { role: MessageRole.Server, data: { content: serverData.content } }
        ])
      })
    }
  }

  useEffect(() => {
    initWs();
    return closeSocket;
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div className={styles.chatRoom}>
      <h2>聊天室</h2>
      <ul ref={chatRef} className={styles.messageList}>
        {messages.map(message => {
          const Message = messageMap[message.role];
          return <Message content={message.data.content} />
        })}
      </ul>
      <div className={styles.newMessage}>
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          type='text'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              sendMsg(newMessage)
            }
          }}
        />
        <button onClick={() => sendMsg(newMessage)}>发送</button>
      </div>
    </div>
  )
}

export default ChatRoom;
