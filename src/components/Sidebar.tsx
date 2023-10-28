import {
    ChevronDown,
    ChevronUp,
    Clapperboard,
    Clock,
    Film,
    Flame,
    Gamepad2,
    Home,
    Library,
    Lightbulb,
    ListVideo,
    Music,
    Newspaper,
    PlaySquare,
    Podcast,
    Radio,
    Repeat,
    Shirt,
    ShoppingBag,
    ThumbsUp,
    Trophy,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import Button, { buttonStyles } from "./Button";
import { useSidebarContext } from "../contexts/SidebarContexts";
import { PageHeader } from "./Navbar";

const Sidebar = () => {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

    return (
        <div className="lg:overflow-y-scroll pb-12 p-2 scrollbar-hidden">
            <div className={` ${isLargeOpen ? "lg:hidden" : "lg:flex flex-col"}`}>
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSidebarItem Icon={Library} title="Library" url="/Library" />
            </div>

            {isSmallOpen ? <div onClick={close} className="bg-black/70 fixed inset-0 z-[9999]" /> : null}

            <div
                className={`w-56 flex-col gap-1 absolute top-0 left-0 z-[9999] lg:static  pb-14 ${isLargeOpen ? "lg:flex" : "hidden"} ${
                    isSmallOpen ? "flex max-h-screen bg-white overflow-y-scroll px-2" : "hidden"
                }`}
            >
                {/* page header */}
                <div className="lg:hidden sticky top-0 bg-white py-2">
                    <PageHeader />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subcriptions" url="/subcriptions" />
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="History" url="/history" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Watch later" url="/playlist?list=WL" />
                    <LargeSidebarItem IconOrImgUrl={ThumbsUp} title="Liked" url="/playlist?list=WL" />
                    {playlists.map((playlist) => (
                        <LargeSidebarItem key={playlist.id} IconOrImgUrl={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`} />
                    ))}
                </LargeSidebarSection>
                <hr />

                <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
                    {subscriptions.map((subscription) => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />

                {/* let students to turn this data to an array of objects and use map() to display */}
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
                    <LargeSidebarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
                    <LargeSidebarItem IconOrImgUrl={Music} title="Music" url="/music" />
                    <LargeSidebarItem IconOrImgUrl={Film} title="Movies & TV" url="/movies-tv" />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
                    <LargeSidebarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
                    <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
                    <LargeSidebarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
                    <LargeSidebarItem IconOrImgUrl={Lightbulb} title="Learning" url="/learning" />
                    <LargeSidebarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
                    <LargeSidebarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
                </LargeSidebarSection>
            </div>
        </div>
    );
};

type SmallSidebarItemProps = {
    Icon: ElementType;
    title: string;
    url: string;
};

const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => (
    <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "flex  flex-col items-center text-xs mb-1")}>
        <Icon />
        <p>{title}</p>
    </a>
);

type LargeSidebarSectionProps = {
    children: ReactNode;
    title?: string;
    visibleItemCount?: number;
};

const LargeSidebarSection = ({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ButtonIcon = !isExpanded ? ChevronDown : ChevronUp;
    const displayingItems = Children.toArray(children).slice(0, isExpanded ? Number.POSITIVE_INFINITY : visibleItemCount);
    const showExpandButton = Children.toArray(children).length > visibleItemCount;

    return (
        <div>
            {title && <p className="font-bold mt-2">{title}</p>}
            <div>{displayingItems}</div>

            {showExpandButton ? (
                <Button variant={"ghost"} className="flex items-center gap-1 w-full" onClick={() => setIsExpanded((prev) => !prev)}>
                    <ButtonIcon className="w-6 h-6" /> {!isExpanded ? "Show more" : "Show less"}
                </Button>
            ) : null}
        </div>
    );
};

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string;
    title: string;
    url: string;
    isActive?: boolean;
};

const LargeSidebarItem = ({ IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) => {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                `flex gap-2 items-center ${isActive ? "bg-neutral-100 hover:bg-neutral-200 font-semibold" : null}`
            )}
        >
            {typeof IconOrImgUrl === "string" ? <img src={IconOrImgUrl} alt="img" className="w-6 h-6 rounded-full" /> : <IconOrImgUrl />}
            {title}
        </a>
    );
};

export default Sidebar;
