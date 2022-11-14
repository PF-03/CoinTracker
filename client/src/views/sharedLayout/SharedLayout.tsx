import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import s from './sharedLayout.module.css';
import { Notification } from '../../components/notification/Notification';
import { NotificationModal } from '../../components/notificationModal/NotificationModal';
import { PriceAlert } from '../../components/PriceAlert/PriceAlert';
import { useState, useEffect } from 'react';
import { getUserWallet } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ChatSocket from '../../components/ChatSocket/chatSocket';

function SharedLayout() {
  const dispatch = useDispatch<any>();
  const { _id } = useSelector((state: any) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const handleNotifications = () => setShowNotifications(!showNotifications);
  const handlePriceAlert = () => setShowPriceAlert(!showPriceAlert);

  useEffect(() => {
    dispatch(getUserWallet(_id));
  }, []);

  return (
    <div className={s.container}>
      <div>
        <Notification
          handleNotifications={handleNotifications}
          handlePriceAlert={handlePriceAlert}
        />
      </div>

      <NotificationModal
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
      <PriceAlert
        showPriceAlert={showPriceAlert}
        setShowPriceAlert={setShowPriceAlert}
      />
      <div>
        <Sidebar />
      </div>
      <ChatSocket />
      <div className={s.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default SharedLayout;
