export default function AboutUsMainImage() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[10/3]">
                <img
                    src="/assets/images/chTI.JPG"
                    alt="Imagem de Sobre Nós"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <p className="absolute inset-0 flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-5xl asap text-center text-white px-4">
                    SOBRE NÓS
                </p>
            </div>
        </div>
    );
}
