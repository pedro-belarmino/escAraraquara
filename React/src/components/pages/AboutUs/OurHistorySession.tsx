import ImageHub from "./ImageHub";

export default function OurHistorySession() {
    return (
        <div className="flex pt-20 pb-20">

            <div className="w-2/12 h-[180px] bg-amber-200">
                <img src="/assets/SVGs/board.svg" alt="" className="w-full h-full object-contain" />
            </div>



            <div className="flex w-8/12">
                <div className="w-6/12">
                    <p className="asap text-2xl font-bold mb-5 text-[#ff654d]">NOSSA HITÓRIA</p>
                    <div className="rubik text-sm text-[#00337C] space-y-5">
                        <p>
                            Desde 1972, o Grupo Escoteiro Araraquara José Luiz Torquato <b>promove o escotismo</b> como uma ferramenta de desenvaivimento pessoal e comunitario.
                        </p>
                        <p>
                            Fundado em 23 de abril. Dia Mundial do Escoteiro, <b>por José Carlos da Rocha Barros e seus amigos</b>, o grupo cresceu e consolidou sua presença na cidade, conquistando uma <b>sede prépria o impactando inúmeras gerações</b>.
                        </p>
                        <p>
                            Em 2011, em nomenagom a <b>José Luiz Torquato</b> - um chefe escoteiro exemplar, reconhacido por sua dedicação, alegria e superação -, o grupo recebeu seu nome atual.
                        </p>
                        <p>
                            Mais do que um movimento, <b>somos uma família que valoriza a união, acolhimento e o trabalho em equipe</b>, inspirando joven e adultos a se tornarem cidadãos mais respansaveis e atuantes.
                        </p>
                        <p>
                            Atualments, seguimos fortalecenda nossa esséncia e <b>ampliando nosso impacto na comunidade</b>. Com ética, respeito e sustentabildade, trabalhamos para formar <b>cidadãos comprometidos em construir um mundo melhor</b>.
                        </p>
                    </div>
                </div>
                <div className="w-1/12 ">
                </div>
                <div className="w-5/12">
                    <ImageHub />
                </div>
            </div>
        </div>
    )
}