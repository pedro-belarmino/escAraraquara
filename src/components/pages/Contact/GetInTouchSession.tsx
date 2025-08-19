export default function GetInTouchSession() {
    return (
        <div className="p-10 flex flex-col lg:w-2/3 place-self-center">
            <h1 className="asap font-bold text-4xl text-[#FF654D]">ENTRE EM CONTATO</h1>

            <div id="container" className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start">

                <div className="w-full lg:w-1/2 ">

                    <div className="text-[#00337C] te space-y-5 text-start">

                        <div>
                            <b className="rubik">Será um prazer conversar com você!</b>
                        </div>

                        <div className="flex flex-col">
                            <b className="rubik">WhatsApp</b>
                            <b className="rubik">Instagram</b>
                            <b className="rubik">Facebook</b>
                        </div>

                        <div>
                            <b className="rubik">Onde Estamos</b>
                        </div>

                        <div className="flex flex-col">
                            <b className="rubik">Av. Antonio Lourenco Correa,</b>
                            <b className="rubik">491 - Vila Xavier</b>
                            <b className="rubik">Araraquara - SP</b>
                        </div>


                        <br />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <img src="public/assets/images/IMG_0877.JPG" className="h-full object-cover" alt="" />
                </div>
            </div>
        </div>
    )
}