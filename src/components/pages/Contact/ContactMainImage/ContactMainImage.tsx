export default function ContactMainImage() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[10/3]">
                <img
                    src="/assets/images/IMG_7393.JPG"
                    alt="Imagem de Contato"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <div className="absolute inset-0 asap flex-col flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-5xl text-center text-white px-4">
                    <p>
                        CONTATO
                    </p>
                </div>
            </div>
        </div>
    )
}