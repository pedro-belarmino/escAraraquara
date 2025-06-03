export default function HowToParticipateMainImage() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[10/3]">
                <img
                    src="/assets/images/part.jpg"
                    alt="Imagem de Sobre Nós"
                    className="w-full h-full object-cover object-center brightness-65"
                />
                <p className="absolute inset-0 flex items-center justify-center font-bold text-3xl text-center text-white">
                    COMO PARTICIPAR
                </p>
            </div>
        </div>
    );
}