import React from 'react';
import st from './SideBar.module.css';


import { AdminPanelSettings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TimeLineIcon from '@mui/icons-material/Timeline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Groups2Icon from '@mui/icons-material/Groups2';
import StorageIcon from '@mui/icons-material/Storage';

export default function SideBar() {
  return (
    <div className={st.sidebar}>

      <div className={st.sidebarWrapper}>
        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Dashboard</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <Link to='/adminView' className={st.link}>
                <HomeIcon className={st.sidebarIcon} />
                HomeIcon
              </Link>
            </li>
            <li className={st.sidebarListItem}>
              <TimeLineIcon className={st.sidebarIcon} />
              Analytics
            </li>
            {/* <li className={st.sidebarListItem}>
              <TrendingUpIcon className={st.sidebarIcon}/>
              Sales
            </li> */}
          </ul>
        </div>

        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Notifications</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <a href="http://www.gmail.com" className={st.link}>
                <MailOutlineIcon className={st.sidebarIcon} />
                Mail
              </a>
            </li>
            <li className={st.sidebarListItem}>
              <Link to='/adminView/helpusmail' className={st.link}>
                <MoveToInboxIcon className={st.sidebarIcon} />
                Help us to improve
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
              <Link to='/adminView/admins' className={st.link}>
                <AdminPanelSettings className={st.sidebarIcon} />
                Admins
              </Link>
            </li>
            <li className={st.sidebarListItem}>
              <Link to='/adminView/doctors' className={st.link}>
                <PersonOutlineIcon className={st.sidebarIcon} />
                Doctors
              </Link>
            </li>
            <li className={st.sidebarListItem}>
              <Link to='/adminView/users' className={st.link}>
                <Groups2Icon className={st.sidebarIcon} />
                Patiens
              </Link>
            </li>
          </ul>
        </div>

        <div className={st.sidebarMenu}>
          <h3 className={st.sidebarTitle}>Merberships</h3>
          <ul className={st.sidebarList}>
            <li className={st.sidebarListItem}>
              <Link to='/adminView/memberships' className={st.link}>
                <StorageIcon className={st.sidebarIcon} />
                Memberships
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
  )
};
