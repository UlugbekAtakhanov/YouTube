import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type SidebarProviderProps = {
    children: ReactNode;
};

type SidebarContextProps = {
    isLargeOpen: boolean;
    isSmallOpen: boolean;
    toggle: () => void;
    close: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);

    // measuring screen size
    const isScreenSmall = () => {
        return window.innerWidth < 1024;
    };

    useEffect(() => {
        const fn = () => {
            if (!isScreenSmall()) {
                setIsSmallOpen(false);
            } else {
                setIsLargeOpen(true);
            }
        };
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);

    // according screen size it will toggle small or large sidebar, it is for hamburger icon
    const toggle = () => {
        if (isScreenSmall()) {
            setIsSmallOpen((prev) => !prev);
        } else {
            setIsLargeOpen((prev) => !prev);
        }
    };

    // according screen size it will close small or large sidebar, it is for clicking outside or like this
    const close = () => {
        if (isScreenSmall()) {
            setIsSmallOpen(false);
        } else {
            setIsLargeOpen(false);
        }
    };

    return <SidebarContext.Provider value={{ isLargeOpen, isSmallOpen, toggle, close }}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;

// custom useContext
export const useSidebarContext = () => {
    const value = useContext(SidebarContext);
    if (value === null) throw Error("Cannot use outside of SidebarProvider");
    return value;
};
