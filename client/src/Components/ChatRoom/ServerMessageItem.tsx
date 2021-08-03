import { FC } from 'react';
import styles from './styles.module.scss';
import { MessageProps } from './index';

const ServerMessageItem: FC<MessageProps> = (props) => {
  const { content } = props;

  return (
    <li className={styles.serverMessage}>
      <div className={styles.content}>
        <span>{content}</span>
      </div>
      <span className={styles.sender}>
        : 客服GieGie
      </span>
    </li>
  )
}

export default ServerMessageItem;
