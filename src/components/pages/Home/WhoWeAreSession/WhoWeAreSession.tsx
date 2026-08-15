import { useNavigate } from "react-router-dom";
import PhotosCarousel from "../../../shared/PhotosCarousel/PhotosCarousel";
import { data } from "./Carrousel_1";

export default function WhoWeAreSession() {

    const navigate = useNavigate()

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">

            {/* Título - sempre em cima */}
            <p className="asap text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ff654d] text-center lg:text-left">
                QUEM SOMOS NÓS
            </p>

            {/* Conteúdo */}
            <div className="rubik text-[#00337C] flex flex-col lg:flex-row gap-8">

                {/* Texto */}
                <div className="w-full lg:w-1/2 space-y-5">
                    <p className="text-base sm:text-lg md:text-xl">
                        Fundado em 1972, o Grupo Escoteiro Araraquara José Luiz Torquato tem uma trajetória marcada pelo compromisso com o escotismo e a formação de jovens cidadãos. Promovemos o desenvolvimento pessoal, o trabalho em equipe e os valores do Movimento Escoteiro.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl">
                        Nossa missão é educar por meio da aventura, da liderança e do serviço à comunidade, preparando-os para serem protagonistas em suas vidas e na sociedade.
                    </p>

                    <div>
                        <button
                            onClick={() => navigate('/sobre-nos')}
                            className="text-[#ff654d] asap border flex rounded-full hover:cursor-pointer border-[#ff654d] px-4 py-1.5 font-semibold text-xl sm:text-2xl md:text-3xl items-center hover:bg-[#ff654d]/10 transition-colors"
                        >
                            <span>Quem Somos</span>
                            <svg
                                className="h-6 w-6 text-[#ff654d] ml-2 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 16 16 12 12 8" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* PhotosCarousel */}
                <div className="w-full lg:w-1/2">
                    <PhotosCarousel images={data} />
                </div>

            </div>
        </div>
    )
}