import React from "react";
import st from "./SideBar.module.css";

import { AdminPanelSettings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TimeLineIcon from "@mui/icons-material/Timeline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Groups2Icon from "@mui/icons-material/Groups2";
import StorageIcon from "@mui/icons-material/Storage";
import Bubble from "../../styles/bubbles";
import { PrivateRoutes } from "../../../rutas/rutas";
import PersonIcon from "@mui/icons-material/Person";

export default function SideBar() {
  return (
    <div className={st.sidebar}>
      <div className={st.sidebarWrapper}>
        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Admin Dashboard</h3>
          <ul className={st.sidebarList}>

            <li className={st.sidebarListItem}>
              <Link to='/admin' className={st.link}>
                <li >
                  <TimeLineIcon className={st.sidebarIcon} />
                  Analytics
                </li>
              </Link>
            </li>

            <li className={st.sidebarListItem}>
              <Link to={PrivateRoutes.HOME} className={st.link}>
                <li >
                  <PersonIcon className={st.sidebarIcon} />
                  as User
                </li>
              </Link>
            </li>
            {/* <li className={st.sidebarListItem}>
              <TrendingUpIcon className={st.sidebarIcon}/>
              Sales
            </li> */}
          </ul>
        </div>
        <Bubble color="blue-dark" size="large" bottom="70%" right="11%" />
        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Notifications</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <a target='_blank' href="http://www.gmail.com" className={st.link}>
                <MailOutlineIcon className={st.sidebarIcon} />
                Mail
              </a>
            </li>
            <li className={st.sidebarListItem}>
              <Link to="/admin/helpusmail" className={st.link}>
                <MoveToInboxIcon className={st.sidebarIcon} />
                Feedback
              </Link>
            </li>
            {/* <li className={st.sidebarListItem}>
              <MarkChatUnread className={st.sidebarIcon}/>
              Messages
            </li> */}
          </ul>
        </div>

        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Users</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <Link to="/admin/admins" className={st.link}>
                <AdminPanelSettings className={st.sidebarIcon} />
                Admins
              </Link>
            </li>
            <li className={st.sidebarListItem}>
              <Link to="/admin/users" className={st.link}>
                <Groups2Icon className={st.sidebarIcon} />
                Clients
              </Link>
            </li>
          </ul>
        </div>

        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Donations</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <Link to="/admin/donations" className={st.link}>
                <StorageIcon className={st.sidebarIcon} />
                Donations
              </Link>
            </li>
            {/* <li className={st.sidebarListItem}>
              <Insights className={st.sidebarIcon}/>
              Analytics
            </li>
            <li className={st.sidebarListItem}>
              <Link to='/adminView/appointments' className={st.link}>
                <EventAvailable className={st.sidebarIcon}/>
                Appointments
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
