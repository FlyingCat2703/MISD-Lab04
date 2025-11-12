import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { TiDocumentText } from "react-icons/ti";

function Header()
{
    return (
        <header className={styles['header']}>
            <div className={styles['container']}>
                <div className={styles['logo']}>
                    <TiDocumentText size={25} />
                    <span>Task Manager</span>
                </div>

                <nav className={styles['nav']}>
                    <Link to="/" className={styles['link']}>All Tasks</Link>
                    <Link to="/add" className={styles['link']}>Add a Task</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;