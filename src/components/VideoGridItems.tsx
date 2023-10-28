import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgoIntl } from "../utils/formatTimeAgo";
import { formatViews } from "../utils/formatViews";

type VideoGridItemsProps = {
    id: string;
    title: string;
    channel: {
        id: string;
        name: string;
        profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
};

const VideoGridItems = ({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }: VideoGridItemsProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoIsVisible, setVideoIsVisible] = useState(false);

    useEffect(() => {
        if (videoRef.current === null) return;
        if (videoIsVisible) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [videoIsVisible]);
    return (
        <div className="space-y-2" onMouseEnter={() => setVideoIsVisible(true)} onMouseLeave={() => setVideoIsVisible(false)}>
            {/* video */}
            <a href={`/watch?v=${id}`} className="relative aspect-video block">
                <img
                    src={thumbnailUrl}
                    alt="img"
                    className={`block object-cover w-full h-full transition-all  ${videoIsVisible ? "rounded-0" : "rounded-xl"}`}
                />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-white text-xs px-1 py-0.5 rounded font-semibold">
                    {formatDuration(duration)}
                </div>
                <video
                    ref={videoRef}
                    src={videoUrl}
                    muted
                    className={`absolute inset-0 transition-all  ${videoIsVisible ? "opacity-100 delay-200" : "opacity-0"}`}
                />
            </a>

            {/* bottom */}
            <div className="flex items-start gap-2">
                {/* right */}
                <div className="">
                    <a href={`/@${channel.id}`} className=" w-12 h-12 block">
                        <img src={channel.profileUrl} alt="img" className="rounded-full w-full h-full object-cover object-center " />
                    </a>
                </div>
                {/* left */}
                <div>
                    <a href={`/watch?v=${id}`} className="font-bold leading-tight block">
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text hover:text-secondary-hover text-sm">
                        {channel.name}
                    </a>
                    <div>
                        <p className="text-sm text-secondary-text">
                            {formatViews(views)} Views • {formatTimeAgoIntl(postedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGridItems;
