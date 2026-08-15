import ReactPlayer from "react-player";
import styles from './GetToKnowOurWork.module.css'

export default function GetToKnowOurWork() {
    return (
        <div className={styles.mainContainer}>
            <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
                <p className={styles.title}>CONHEÇA NOSSO TRABALHO</p>
                <div className="w-full aspect-video my-6 rounded-2xl overflow-hidden shadow-lg bg-black">
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
