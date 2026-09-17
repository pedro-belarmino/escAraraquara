import ReactPlayer from "react-player";
import styles from './GetToKnowOurWork.module.css'

export default function GetToKnowOurWork() {
    return (
        <div className={styles.mainContainer}>
            <div className="z-10 w-full max-w-4xl px-6 md:px-10">
                <p className={styles.title}>CONHEÇA NOSSO TRABALHO</p>
                <div className="relative w-full aspect-video mt-6">
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=H7nFdHFK-Go"
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>
            </div>

            <img
                src="/assets/SVGs/trees.svg"
                className={styles.img}
                style={{ objectFit: "none" }}
            />
        </div>
    );
}
