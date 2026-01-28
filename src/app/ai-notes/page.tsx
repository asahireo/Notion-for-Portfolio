import { Metadata } from 'next';
import Link from 'next/link';
import { getNotes } from '@/lib/notion';
import NoteCard from '@/components/NoteCard';
import NotesList from '@/components/NotesList';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'AI Notes | Alfahad Niloy',
    description:
        'Weekly notes on AI, machine learning, and the latest in artificial intelligence.',
};

export default async function AINotesPage() {
    let notes: Awaited<ReturnType<typeof getNotes>> = [];
    let error: string | null = null;

    try {
        notes = await getNotes();
    } catch (e) {
        console.error('Failed to fetch notes:', e);
        error = 'Unable to load notes. Please check your Notion configuration.';
    }

    return (
        <main className="min-h-screen bg-brand-dark">
            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-6">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-brand-light/50 hover:text-brand-neon transition-colors duration-300 mb-8 group"
                    >
                        <svg
                            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        <span className="font-mono text-xs uppercase tracking-wider">
                            Back to Portfolio
                        </span>
                    </Link>

                    {/* Title */}
                    {/* Title */}
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-brand-light mb-8 tracking-tighter">
                        AI <span className="text-brand-neon">Notes</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-brand-light/60 max-w-2xl leading-relaxed">
                        Weekly thoughts, discoveries, and insights on artificial
                        intelligence, machine learning, and the future of tech.
                    </p>

                    {/* Decorative line */}
                    <div className="mt-12 h-px bg-gradient-to-r from-brand-neon/50 via-brand-neon/20 to-transparent" />
                </div>
            </section>

            {/* Notes Grid */}
            <section className="px-6 pb-24 sm:pb-32">
                <div className="max-w-7xl mx-auto">
                    {error ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                                <svg
                                    className="w-8 h-8 text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <p className="text-brand-light/50">{error}</p>
                        </div>
                    ) : (
                        <NotesList
                            initialNotes={notes}
                            databaseId={process.env.NOTION_DATABASE_ID || ""}
                        />
                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
