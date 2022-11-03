import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import s from './sharedLayout.module.css'

function SharedLayout() {
    return (
        <div className={s.container}>
            <div>
                <Sidebar />
            </div>
            <div className={s.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default SharedLayout;