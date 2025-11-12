import Header from "../Header/Header";
import styles from "./Layout.module.css";
import { Outlet } from 'react-router-dom';

function Layout()
{
    return (
        <div className={styles['container']}>
            <Header />

            <main className={styles['main-content']}>
                <Outlet/>
            </main>

        </div>
    )
}

export default Layout;