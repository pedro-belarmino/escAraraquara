import ReactPlayer from "react-player";

export default function GetToKnowOurWork() {
    return (
        <div className='relative w-full bg-[#D0C9BF] min-h-[400px] items-center justify-center flex flex-col pt-10'>
            <div className="z-10">
                <p className='font-bold text-3xl text-center text-[#00337C] asap'>CONHEÇA NOSSO TRABALHO</p>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=H7nFdHFK-Go"
                    style={{ width: "80vw", aspectRatio: "16/9", padding: "40px" }}
                    controls
                />
            </div>

            <img
                src="/assets/SVGs/trees.svg"
                className='absolute w-full '
                style={{ objectFit: "none" }}
            />
        </div>
    );
}
