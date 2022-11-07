import style from './Notification.module.css';
import bellIcon from '../../assets/Vector.png';
import { useSelector } from 'react-redux';

export const Notification = ({ handleNotifications, handlePriceAlert }) => {
  const reminders: any = useSelector<any>((state) => state.userReminders);

  return (
    <div className={style['notification-bell']}>
      <button onClick={handlePriceAlert} className={style['create-alert']}>
        Create Price Alert
      </button>
      <div onClick={handleNotifications}>
        <p className={style['notification-counter']}>
          {reminders.filter(
            (reminder) => !reminder.readed && reminder.fullfilled
          ).length || ''}
        </p>
        <img
          src={bellIcon}
          alt='notification bell'
          width='45px'
          height='50px'
        />
      </div>
    </div>
  );
};
