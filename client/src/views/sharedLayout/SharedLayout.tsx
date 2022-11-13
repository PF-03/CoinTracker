import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import s from "./sharedLayout.module.css";
import { Notification } from "../../components/notification/Notification";
import { NotificationModal } from "../../components/notificationModal/NotificationModal";
import { PriceAlert } from "../../components/PriceAlert/PriceAlert";
import { useState } from "react";
import ChatSocket from "../../components/ChatSocket/chatSocket";

function SharedLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const handleNotifications = () => setShowNotifications(!showNotifications);
  const handlePriceAlert = () => setShowPriceAlert(!showPriceAlert);

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
