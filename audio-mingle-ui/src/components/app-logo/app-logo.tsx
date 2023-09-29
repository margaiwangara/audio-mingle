import styles from './app-logo.module.css';
import { IoPauseCircleOutline } from 'react-icons/io5';

export default function AppLogo() {
  return (
    <div
      className={`${styles['am--logo']} d-flex align-items-center justify-content-center`}
    >
      <span className="mr-1">
        <IoPauseCircleOutline />
      </span>
      <span className={`${styles['am--logo-text']} pt-1`}>AudioMingle</span>
    </div>
  );
}
