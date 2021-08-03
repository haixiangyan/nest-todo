import { FC } from 'react';
import styles from './styles.module.scss';
import { MessageProps } from './index';

const ClientMessageItem: FC<MessageProps> = (props) => {
  const { content } = props;

  return (
    <li className={styles.clientMessage}>
      <span className={styles.sender}>
        我 :
      </span>
      <div className={styles.content}>
        <span>{content}</span>
      </div>
    </li>
  )
}

export default ClientMessageItem;
