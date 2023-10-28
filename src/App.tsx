import { useState } from "react";
import CategoryPills from "./components/CategoryPills";
import Navbar from "./components/Navbar";
import { categories, videos } from "./data/home";
import VideoGridItems from "./components/VideoGridItems";
import Sidebar from "./components/Sidebar";
import SidebarProvider from "./contexts/SidebarContexts";

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen">
                <Navbar />

                <div className="grid grid-cols-[auto,1fr] overflow-hidden gap-2">
                    <Sidebar />

                    <div className="overflow-y-scroll overflow-x-hidden pb-4">
                        {/* categories */}
                        <div className="sticky top-0 z-10 whitespace-nowrap py-2 bg-white">
                            <CategoryPills categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        </div>

                        {/* videos */}
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 pr-2">
                            {videos.map((video) => (
                                <VideoGridItems {...video} key={video.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default App;
