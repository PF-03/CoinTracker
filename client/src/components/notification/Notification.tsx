import style from './Notification.module.css';
import { useSelector } from 'react-redux';
import Button from '../styles/button';

export const Notification = ({ handleNotifications, handlePriceAlert }) => {
  const reminders: any = useSelector<any>((state) => state.userReminders);

  return (
    <div className={style['notification-bell']}>
      <Button gradient onClick={handlePriceAlert} className={style['create-alert']}>
        Create Price Alert
      </Button>
      <div onClick={handleNotifications}>
        <p className={style['notification-counter']}>
          {reminders.filter(
            (reminder) => !reminder.readed && reminder.fullfilled
          ).length || ''}
        </p>
        <div className={style['notification-icon']}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4 15.5V14h1V9q0-1.792 1.115-3.177Q7.229 4.438 9 4.104V3q0-.417.292-.708Q9.583 2 10 2t.708.292Q11 2.583 11 3v1.104q1.771.334 2.885 1.708Q15 7.188 15 9v5h1v1.5Zm6-5.875ZM10 18q-.625 0-1.062-.438Q8.5 17.125 8.5 16.5h3q0 .625-.438 1.062Q10.625 18 10 18Zm-3.5-4h7V9q0-1.458-1.021-2.479Q11.458 5.5 10 5.5q-1.458 0-2.479 1.021Q6.5 7.542 6.5 9Z" /></svg>
        </div>
      </div>
    </div>
  );
};
