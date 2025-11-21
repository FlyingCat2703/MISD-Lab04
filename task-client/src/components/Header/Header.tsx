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
            </div>
        </header>
    );
}

export default Header;