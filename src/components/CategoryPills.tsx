import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({ categories, selectedCategory, setSelectedCategory }: CategoryPillsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [translate, setTranslate] = useState(0);
    const [leftIsVisible, setLeftIsVisible] = useState(false);
    const [rightIsVisible, setRightIsVisible] = useState(true);

    useEffect(() => {
        if (containerRef.current === null) return;
        const observer = new ResizeObserver(() => {
            setLeftIsVisible(translate < 0);
            setRightIsVisible(() => {
                const sw = scrollContainerRef.current?.scrollWidth ?? 0;
                const cw = containerRef.current?.clientWidth ?? 0;
                return translate * -1 + cw < sw;
            });
        });
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [categories, translate]);

    return (
        <div ref={containerRef}>
            <div
                ref={scrollContainerRef}
                className="flex gap-2 w-max transition-all overflow-x-hidden"
                style={{ transform: `translateX(${translate}px)` }}
            >
                {categories.map((category, index) => (
                    <Button
                        variant={selectedCategory === category ? "dark" : "default"}
                        onClick={() => setSelectedCategory(category)}
                        size={"category"}
                        key={index}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* left arrow */}
            {leftIsVisible ? (
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 pl-1">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() =>
                            setTranslate((prev) => {
                                const newTranslate = prev + TRANSLATE_AMOUNT;
                                if (newTranslate >= 0) {
                                    return 0;
                                }
                                return newTranslate;
                            })
                        }
                    >
                        <ChevronLeft />
                    </Button>
                </div>
            ) : null}

            {/* right arrow */}
            {rightIsVisible ? (
                <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 flex justify-end pr-2">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() =>
                            setTranslate((prev) => {
                                const newTranslate = prev - TRANSLATE_AMOUNT;
                                const sw = scrollContainerRef.current?.scrollWidth ?? 0;
                                const cw = containerRef.current?.clientWidth ?? 0;
                                const diff = sw - cw;
                                if (newTranslate * -1 >= diff) {
                                    return diff * -1;
                                }
                                return newTranslate;
                            })
                        }
                    >
                        <ChevronRight />
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default CategoryPills;
