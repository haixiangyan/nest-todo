import { FC, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { wsURL } from '../../constants';
import { Message, MessageData, MessageRole } from '../../types/Chat';
import styles from './styles.module.scss';
import ClientMessageItem from './ClientMessageItem';
import ServerMessageItem from './ServerMessageItem';
import AuthContext from '../../contexts/AuthContext';

export interface MessageProps {
  content: string;
}

const messageMap: Record<MessageRole, FC<MessageProps>> = {
  [MessageRole.Client]: ClientMessageItem,
  [MessageRole.Server]: ServerMessageItem,
}

interface Props {
  onCancel: () => void;
}

const ChatRoom: FC<Props> = (props) => {
  const { onCancel } = props;

  const { token } = useContext(AuthContext);

  const socketRef = useRef<Socket>();
  const chatRef = useRef<HTMLUListElement | null>(null);

  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const onServerToClient = (serverData: MessageData) => {
    console.log('服务器消息', serverData);
    setMessages([
      ...messages,
      { role: MessageRole.Server, createdAt: Date.now(), data: { content: serverData.content }}
    ])
  }

  const initWs = () => {
    socketRef.current = io(wsURL, {
      path: '/chat/socket.io',
      extraHeaders: {
        authorization: `Bearer ${token}` || ''
      }
    });
    socketRef.current.on('connect', () => {
      console.log('WS 已连接');
      sendMsg('你好');
    });
    socketRef.current.on('exception', (data) => console.error('WS 异常', data));
    socketRef.current.on('disconnect', () => console.log('WS 已断开连接'));
  }

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current?.close();
    }
  }

  const sendMsg = (content: string) => {
    const newMessages = [
      ...messages,
      { role: MessageRole.Client, createdAt: Date.now(), data: { content } }
    ]

    setMessages(newMessages);

    if (socketRef.current) {
      socketRef.current?.emit('clientToServer', { content }, (serverData: MessageData) => {
        console.log('服务器消息:', serverData);
        setMessages([
          ...newMessages,
          { role: MessageRole.Server, createdAt: Date.now(), data: { content: serverData.content } }
        ])
      })
    }
  }

  // 初始化 Web Socket
  useEffect(() => {
    initWs();
    return closeSocket;
  }, []);

  // 绑定 Web Socket 事件
  useEffect(() => {
    socketRef.current?.on('serverToClient', onServerToClient);
    return () => {
      socketRef.current?.off('serverToClient', onServerToClient);
    }
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div className={styles.chatRoom}>
      <header className={styles.header}>
        <h2>聊天室</h2>
        <span onClick={onCancel}>X</span>
      </header>
      <ul ref={chatRef} className={styles.messageList}>
        {messages.map(message => {
          const Message = messageMap[message.role];
          return <Message key={message.createdAt} content={message.data.content} />
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
