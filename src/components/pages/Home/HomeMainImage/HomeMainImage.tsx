export default function HomeMainImage() {
    return (

        <div className="w-full">
            <div className="relative w-full aspect-[10/3]">
                <img
                    src="/assets/images/home.png"
                    alt="Imagem de Sobre Nós"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-6xl asap text-center text-white">
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