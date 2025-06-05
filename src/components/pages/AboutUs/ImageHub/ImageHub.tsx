export default function ImageHub() {
    return (
        <div className="flex w-full justify-between h-full aspect-square bg-sky-200">
            <div className="flex flex-col justify-around w-5/12">
                <div className="w-full aspect-square max-w-[70%] border rounded-2xl self-end">
                    <img
                        src="/assets/images/hubImage3.png"
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
                <div className="w-full aspect-square border rounded-2xl self-center">
                    <img
                        src="/assets/images/hubImage2.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
                <div className="h-1/12"></div>
            </div>

            <div className="flex flex-col w-6/12 gap-4">
                <div className="h-1/12"></div>
                <div className="w-full aspect-square border rounded-2xl self-center">
                    <img
                        src="/assets/images/hubImage1.JPG"
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
                <div className="w-full aspect-square border rounded-2xl max-w-[60%] self-start">
                    <img
                        src="/assets/images/hubImage4.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </div>
        </div>




    )
}