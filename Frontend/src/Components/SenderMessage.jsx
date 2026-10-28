import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const SenderMessage = ({ message, image }) => {

    let scroll = useRef()
    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" })

    }, [message, image])

    const handleDownload = async () => {
        try {
            const response = await fetch(image);

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "chat-image.png";

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.log("DOWNLOAD ERROR:", error);
        }
    };
    const handleImageScroll = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" })

    }

    return (
        <div className="flex justify-end mb-3">
            <div ref={scroll}
            >

                {image && (
                    <div>

                        {/* Image Click -> Open Image */}
                        <a
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={image}
                                onLoad={handleImageScroll}
                                alt="sent"
                                className="w-[250px] rounded-lg cursor-pointer"
                            />
                        </a>

                        {/* Download */}
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="block text-blue-500 text-sm mt-1 cursor-pointer"
                        >
                            ↓ Download
                        </button>

                    </div>
                )}

                {message && (
                    <p className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-1"
                    >
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

export default SenderMessage;

