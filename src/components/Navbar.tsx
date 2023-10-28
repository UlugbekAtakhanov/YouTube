import { ArrowLeft, Bell, Menu, Mic, Search, User, Video } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { useSidebarContext } from "../contexts/SidebarContexts";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="flex justify-between items-center gap-4 p-2">
            {/* left */}
            <PageHeader showSearch={showSearch} />

            {/* middle */}
            <form className={`items-center  h-10 gap-2 flex-1 justify-center ${showSearch ? "flex" : "hidden md:flex"}`}>
                <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    className={`${showSearch ? "block" : "hidden"}`}
                    onClick={() => setShowSearch(false)}
                >
                    <ArrowLeft />
                </Button>
                <div className="flex max-w-[600px] flex-1">
                    <input
                        type="search"
                        className="border max-w-[600px] w-full rounded-l-full px-4 outline-none border-secondary-border shadow-inner shadow-secondary focus:border-blue-500"
                        placeholder="Search.."
                    />
                    <Button className="rounded-l-none rounded-r-full px-4 flex justify-center border border-secondary-border border-l-0">
                        <Search />
                    </Button>
                </div>
                <Button size={"icon"} type="button">
                    <Mic />
                </Button>
            </form>

            {/* right */}
            <div className={`items-center gap-1 ${showSearch ? "hidden" : "flex"} `}>
                <Button variant={"ghost"} size={"icon"} className="md:hidden" onClick={() => setShowSearch(true)}>
                    <Search />
                </Button>
                <Button variant={"ghost"} size={"icon"} className="md:hidden">
                    <Mic />
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                    <Video />
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                    <Bell />
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                    <User />
                </Button>
            </div>
        </div>
    );
};

export default Navbar;

type PageHeaderProps = {
    showSearch?: boolean;
};

export const PageHeader = ({ showSearch = false }: PageHeaderProps) => {
    const { toggle } = useSidebarContext();

    return (
        <div className={`gap-1 items-center ${showSearch ? "hidden" : "flex"}`}>
            <Button onClick={toggle} variant={"ghost"} size={"icon"}>
                <Menu />
            </Button>

            <a href="#" className="">
                <img src={logo} alt="img" className="h-6" />
            </a>
        </div>
    );
};
