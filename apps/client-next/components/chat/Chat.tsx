import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import cn from 'classnames';
import { SendFill, XCircle } from 'react-bootstrap-icons';
import { io } from 'socket.io-client';

export const Chat = (): ReactElement => {
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string;
      isMy: boolean;
    }[]
  >([]);
  const socket = useMemo(() => io('http://localhost:3333'), []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  socket.on('messageInput', (message) => {
    setMessages([...messages, { id: Date.now(), message, isMy: false }]);
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const onMessageSend = () => {
    if (!inputRef.current) {
      return;
    }

    setMessages([
      ...messages,
      { id: Date.now(), message: inputRef.current.value, isMy: true },
    ]);
    socket.emit('message', inputRef.current.value);
    inputRef.current.value = '';
  };
  return (
    <div className={styles.chat}>
      <div className={styles.chat__header}>
        <div>Консультация</div>
        <XCircle />
      </div>
      <div
        className={cn(styles.messages, 'border-top border-bottom')}
        ref={messagesRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(styles.messages__item, styles.message, {
              [styles.message_my]: message.isMy,
            })}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className={styles.chat__footer}>
        <input
          type="text"
          className="form-control"
          ref={inputRef}
          onKeyUp={(event) => event.key == 'Enter' && onMessageSend()}
        />
        <button className="btn btn-link" onClick={onMessageSend}>
          <SendFill />
        </button>
      </div>
    </div>
  );
};
