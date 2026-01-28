"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { CircularGallery } from "./CircularGallery";

const videos = [
    {
        id: "B6jNruMtPb8",
        embedUrl: "https://www.youtube.com/embed/B6jNruMtPb8?autoplay=1",
        image: "/images/short_cover_1.png",
        hoverImage: "https://img.youtube.com/vi/B6jNruMtPb8/hqdefault.jpg",
        title: "High Energy Edit",
        isShort: true
    },
    {
        id: "cn6OXkoQd7g",
        embedUrl: "https://www.youtube.com/embed/cn6OXkoQd7g?autoplay=1",
        image: "/images/short_cover_2.png",
        hoverImage: "https://img.youtube.com/vi/cn6OXkoQd7g/hqdefault.jpg",
        title: "VFX Showcase",
        isShort: true
    },
    {
        id: "DUWqkLRuQmU",
        embedUrl: "https://www.youtube.com/embed/DUWqkLRuQmU?autoplay=1",
        image: "/images/creative_edit_1.png",
        hoverImage: "https://img.youtube.com/vi/DUWqkLRuQmU/maxresdefault.jpg",
        title: "Creative Edit 1",
    },
    {
        id: "XHR44wmQdIo",
        embedUrl: "https://www.youtube.com/embed/XHR44wmQdIo?autoplay=1",
        image: "/images/creative_edit_2.png",
        hoverImage: "https://img.youtube.com/vi/XHR44wmQdIo/maxresdefault.jpg",
        title: "Creative Edit 2",
    },
    {
        id: "4dbxPQGeo4c",
        embedUrl: "https://www.youtube.com/embed/4dbxPQGeo4c?autoplay=1",
        image: "/images/creative_edit_3.png",
        hoverImage: "https://img.youtube.com/vi/4dbxPQGeo4c/maxresdefault.jpg",
        title: "Creative Edit 3",
    },
    {
        id: "qLFFcax29Gw",
        embedUrl: "https://www.youtube.com/embed/qLFFcax29Gw?autoplay=1",
        image: "/images/creative_edit_4.png",
        hoverImage: "https://img.youtube.com/vi/qLFFcax29Gw/maxresdefault.jpg",
        title: "Creative Edit 4",
    },
    {
        id: "archive",
        embedUrl: "",
        externalUrl: "https://www.youtube.com/@XPAT_MY/playlists",
        image: "/images/archive_cover.png",
        hoverImage: "/images/archive_cover.png",
        title: "View More Work",
        isShort: false
    }
];

export default function VideoGallery() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const galleryItems = useMemo(() => videos.map(video => ({
        image: video.image,
        hoverImage: video.hoverImage,
        text: video.title,
        onClick: () => {
            if ((video as any).externalUrl) {
                window.open((video as any).externalUrl, '_blank');
            } else {
                setSelectedVideo(video);
            }
        },
    })), []);

    return (
        <>
            <section className="py-24 w-full bg-black/20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-12 mb-8">
                    <div className="mb-8">
                        <span className="block text-brand-neon font-mono text-sm tracking-widest mb-4 uppercase">
                            Visual Portfolio
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                            Creative <span className="text-outline stroke-brand-light">Edits</span>
                        </h2>
                    </div>

                    <p className="text-brand-light/50 text-sm font-mono mb-8">
                        Drag/Scroll to rotate. Click on any video to play.
                    </p>
                </div>

                <div className="h-[50vh] min-h-[400px] md:h-[600px] w-full relative mb-12 cursor-grab active:cursor-grabbing">
                    <CircularGallery
                        items={galleryItems}
                        bend={3}
                        borderRadius={0.05}
                        className="text-brand-neon font-mono"
                    />
                </div>

            </section>

            {/* Video Modal - Rendered via Portal */}
            {mounted && selectedVideo && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className={`relative w-full ${
                            // @ts-ignore - isShort might not exist on all items yet
                            selectedVideo.isShort
                                ? "max-w-md aspect-[9/16] max-h-[85vh]"
                                : "max-w-6xl aspect-video"
                            } bg-black rounded-lg overflow-hidden border border-brand-neon/20 shadow-2xl shadow-brand-neon/10 transition-all duration-300`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute z-10 top-4 right-4 bg-black/50 hover:bg-brand-neon hover:text-black text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm group"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>
                        <iframe
                            src={selectedVideo.embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
