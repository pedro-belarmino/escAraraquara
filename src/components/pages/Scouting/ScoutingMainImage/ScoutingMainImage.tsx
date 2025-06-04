export default function ScoutingMainImage() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[10/3]">
                <img
                    src="/assets/images/IMG_1116.JPG"
                    alt="Imagem de Sobre Nós"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <p className="absolute inset-0 asap flex items-center justify-center font-bold text-4xl text-center text-white">
                    ESCOTISMO
                </p>
            </div>
        </div>
    );
}