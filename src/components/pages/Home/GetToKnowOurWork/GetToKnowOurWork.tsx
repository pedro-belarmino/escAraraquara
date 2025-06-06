import ReactPlayer from "react-player";
import styles from './GetToKnowOurWork.module.css'

export default function GetToKnowOurWork() {
    return (
        <div className={styles.mainContainer}>
            <div className="z-10">
                <p className={styles.title}>CONHEÇA NOSSO TRABALHO</p>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=H7nFdHFK-Go"
                    style={{ width: "80vw", aspectRatio: "16/9", padding: "40px" }}
                    controls
                />
            </div>

            <img
                src="/assets/SVGs/trees.svg"
                className={styles.img}
                style={{ objectFit: "none" }}
            />
        </div>
    );
}
