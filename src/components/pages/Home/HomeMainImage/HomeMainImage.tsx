import styles from './HomeMainImage.module.css'

export default function HomeMainImage() {
    return (

        <div className="w-full">
            <div className={styles.mainContainer}>
                <img
                    src="/public/assets/images/home.png"
                    alt="Imagem de Sobre Nós"
                    className={styles.img}
                />
                <div className={styles.containerStyle}>
                    <p>
                        HÁ 53 ANOS CONSTRUINDO
                    </p>
                    <p>
                        UM MUNDO MELHOR.
                    </p>
                </div>
            </div>
        </div>
    )
}