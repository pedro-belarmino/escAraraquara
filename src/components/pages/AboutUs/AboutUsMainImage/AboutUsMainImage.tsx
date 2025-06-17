export default function AboutUsMainImage() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[10/3]">
                <img
                    // src="/public/assets/images/sobre.JPG"
                    src="/assets/images/chTI.JPG"
                    alt="Imagem de Sobre Nós"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <p className="absolute inset-0 flex items-center justify-center font-bold text-6xl asap text-center text-white">
                    SOBRE NÓS
                </p>
            </div>
        </div>
    );
}
