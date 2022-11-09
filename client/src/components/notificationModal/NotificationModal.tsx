import style from './NotificationModal.module.css';
import { useEffect } from 'react';
import { getReminders } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const NotificationModal = ({
  showNotifications,
  setShowNotifications,
}) => {
  const dispatch = useDispatch<any>();
  const reminders: any = useSelector<any>((state) => state.userReminders);
  const allActives: any = useSelector<any>((state) => state.activos);
  const user: any = useSelector<any>((state) => state.user);

  const markReaded = (data: any) => {
    axios.put('/reminder', { ...data, readed: true });
    dispatch(getReminders(user.username));
  };

  const deleteRemainder = (id: any) => {
    axios.delete('/reminder', { params: { id: id } });
    dispatch(getReminders(user.username));
  };

  useEffect(() => {
    dispatch(getReminders(user.username));
  }, [dispatch, getReminders]);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      {showNotifications && (
        <div onClick={handleClick} className={style.overlay}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style['modal-container']}
          >
            <div className={style.header}>
              <h4>Notifications</h4>
              <button onClick={handleClick} className={style.close}>
                X
              </button>
            </div>

            <div className={style['alerts-container']}>
              {reminders
                .filter((reminder: any) => reminder.fullfilled)
                .map((item: any) => {
                  const [token, price] = item.token_price?.split(' ');
                  return (
                    <div className={style.alert} key={item._id}>
                      <p>{token.toUpperCase()}</p>
                      <img
                        src={allActives.find((a) => a.symbol === token).image}
                        alt={token}
                        width='30px'
                        height='30px'
                      />
                      <p>{price}$</p>
                      <button
                        className={style['read-button']}
                        onClick={() => markReaded(item)}
                      >
                        {item.readed ? 'Readed' : 'Mark as readed'}
                      </button>
                      <div
                        onClick={() => deleteRemainder(item._id)}
                        className={style['delete-button']}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
