export default function ImageHub() {
    return (
        <div className="w-full p-5 md:p-10">

            <div className="grid grid-cols-12 gap-4 h-auto">

                <div className="col-span-5 row-span-3 row-start-2 rounded-2xl overflow-hidden aspect-square">
                    <img
                        src="/assets/images/hubImage3.png"
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="col-span-7 row-span-4  rounded-2xl overflow-hidden aspect-square">
                    <img
                        src="/assets/images/hubImage2.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="col-span-7 row-span-3  rounded-2xl overflow-hidden aspect-square">
                    <img
                        src="/assets/images/hubImage1.JPG"
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="col-span-5 row-span-2  rounded-2xl overflow-hidden aspect-square">
                    <img
                        src="/assets/images/hubImage4.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

            </div>
        </div>
    );
}
