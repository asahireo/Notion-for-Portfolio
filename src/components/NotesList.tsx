'use client';

import { useState, useEffect } from 'react';
import NoteCard from './NoteCard';

interface NotionNote {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    tags: string[];
    published: boolean;
}

interface NotesListProps {
    initialNotes: NotionNote[];
    databaseId: string;
}

export default function NotesList({ initialNotes }: NotesListProps) {
    if (initialNotes.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-neon/10 border border-brand-neon/20 mb-6">
                    <svg
                        className="w-8 h-8 text-brand-neon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-brand-light mb-2">
                    No notes yet
                </h2>
                <p className="text-brand-light/50">
                    The first AI note is coming soon. Stay tuned!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {initialNotes.map((note, index) => (
                <NoteCard
                    key={note.id}
                    title={note.title}
                    date={note.date}
                    excerpt={note.excerpt}
                    tags={note.tags}
                    slug={note.slug}
                    index={index}
                />
            ))}
        </div>
    );
}
