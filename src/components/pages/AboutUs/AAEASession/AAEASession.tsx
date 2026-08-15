export default function AAEASESSION() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 space-y-4">
                    <h2 className="text-[#FF654D] text-2xl sm:text-3xl font-bold asap">
                        ASSOCIAÇÃO DOS AMIGOS DOS ESCOTEIROS DE ARARAQUARA
                    </h2>
                    <p className="rubik text-[#00337C] text-base sm:text-lg">
                        A <b>A.A.E.A.</b> é nossa mantenedora, uma entidade de apoio dedicada a <b>fortalecer e viabilizar</b> as atividades do grupo. Por meio de iniciativas administrativas e estruturais, a A.A.E.A. <b>contribui para a manutenção da sede, captação de recursos e suporte logístico,</b> garantindo que o escotismo continue transformando vidas e impactando nossa comunidade de forma positiva.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src="/assets/images/somosEscoteiros.png"
                        alt="A.A.E.A."
                        className="w-full h-auto max-h-80 object-cover rounded-2xl shadow-md"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                </div>
            </div>
        </div>
    )
}