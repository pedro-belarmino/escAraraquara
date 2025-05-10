export default function ImageHub() {
    return (
        <div className="w-full h-full border-1">
            <div className="flex">
                <div id="direita" className="p-3">
                    <div>
                        <img src="src/assets/images/part.jpg" alt="" />
                    </div>
                    <div>
                        <img src="src/assets/images/part.jpg" alt="" />
                    </div>
                </div>
                <div id="esquerda" className="p-3">
                    <div>
                        <img src="src/assets/images/part.jpg" alt="" />
                    </div>
                    <div>
                        <img src="src/assets/images/part.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}