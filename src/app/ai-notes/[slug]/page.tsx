import { Metadata } from 'next';
import Link from 'next/link';
import { getNoteBySlug, getAllNoteSlugs, NotionBlock } from '@/lib/notion';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = await getAllNoteSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const result = await getNoteBySlug(slug);

    if (!result) {
        return {
            title: 'Note Not Found | Alfahad Niloy',
        };
    }

    return {
        title: `${result.note.title} | AI Notes | Alfahad Niloy`,
        description: result.note.excerpt || `Read ${result.note.title} on Alfahad Niloy's AI Notes.`,
    };
}

// Render a single block
function renderBlock(block: NotionBlock, index: number) {
    const key = `${block.id}-${index}`;

    switch (block.type) {
        case 'paragraph':
            return block.content ? (
                <p key={key} className="text-brand-light/70 leading-relaxed mb-4">
                    {block.content}
                </p>
            ) : (
                <div key={key} className="h-4" />
            );

        case 'heading_1':
            return (
                <h1
                    key={key}
                    className="text-3xl sm:text-4xl font-bold text-brand-light mt-10 mb-6"
                >
                    {block.content}
                </h1>
            );

        case 'heading_2':
            return (
                <h2
                    key={key}
                    className="text-2xl sm:text-3xl font-semibold text-brand-light mt-8 mb-4"
                >
                    {block.content}
                </h2>
            );

        case 'heading_3':
            return (
                <h3
                    key={key}
                    className="text-xl sm:text-2xl font-semibold text-brand-light mt-6 mb-3"
                >
                    {block.content}
                </h3>
            );

        case 'bulleted_list_item':
            return (
                <li
                    key={key}
                    className="text-brand-light/70 leading-relaxed ml-6 list-disc mb-2"
                >
                    {block.content}
                    {block.children && (
                        <ul className="mt-2">
                            {block.children.map((child, i) => renderBlock(child, i))}
                        </ul>
                    )}
                </li>
            );

        case 'numbered_list_item':
            return (
                <li
                    key={key}
                    className="text-brand-light/70 leading-relaxed ml-6 list-decimal mb-2"
                >
                    {block.content}
                    {block.children && (
                        <ol className="mt-2">
                            {block.children.map((child, i) => renderBlock(child, i))}
                        </ol>
                    )}
                </li>
            );

        case 'code':
            return (
                <pre
                    key={key}
                    className="bg-black/40 border border-white/10 rounded-xl p-4 sm:p-6 overflow-x-auto mb-6"
                >
                    <code className="text-sm font-mono text-brand-neon/90">
                        {block.content}
                    </code>
                    {block.language && (
                        <span className="block mt-2 text-xs text-brand-light/30 font-mono">
                            {block.language}
                        </span>
                    )}
                </pre>
            );

        case 'quote':
            return (
                <blockquote
                    key={key}
                    className="border-l-4 border-brand-neon/50 pl-6 py-2 my-6 italic text-brand-light/60"
                >
                    {block.content}
                </blockquote>
            );

        case 'callout':
            return (
                <div
                    key={key}
                    className="bg-brand-neon/10 border border-brand-neon/20 rounded-xl p-4 sm:p-6 mb-6"
                >
                    <p className="text-brand-light/80">{block.content}</p>
                </div>
            );

        case 'image':
            return (
                <figure key={key} className="my-8">
                    {block.url && (
                        <img
                            src={block.url}
                            alt={block.caption || 'Image'}
                            className="rounded-xl w-full border border-white/10"
                        />
                    )}
                    {block.caption && (
                        <figcaption className="text-center text-sm text-brand-light/40 mt-3">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'divider':
            return (
                <hr
                    key={key}
                    className="my-8 border-t border-white/10"
                />
            );

        default:
            return null;
    }
}

export default async function NotePage({ params }: PageProps) {
    const { slug } = await params;
    const result = await getNoteBySlug(slug);

    if (!result) {
        notFound();
    }

    const { note, blocks } = result;

    // Format date
    const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="min-h-screen bg-brand-dark">
            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-6">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/ai-notes"
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
                            Back to AI Notes
                        </span>
                    </Link>

                    {/* Date & Tags */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="font-mono text-sm text-brand-light/50">
                            {formattedDate}
                        </span>
                        {note.tags.length > 0 && (
                            <>
                                <span className="text-brand-light/20">•</span>
                                <div className="flex flex-wrap gap-2">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-brand-neon/10 text-brand-neon border border-brand-neon/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-light leading-tight">
                        {note.title}
                    </h1>

                    {/* Decorative line */}
                    <div className="mt-10 h-px bg-gradient-to-r from-brand-neon/50 via-brand-neon/20 to-transparent" />
                </div>
            </section>

            {/* Content */}
            <section className="px-6 pb-24 sm:pb-32">
                <article className="max-w-3xl mx-auto prose-custom">
                    {blocks.map((block, index) => renderBlock(block, index))}
                </article>
            </section>

            {/* Footer */}
            <footer className="w-full py-12 flex flex-col items-center justify-center text-brand-light/30 border-t border-white/5 bg-black/20">
                <p className="font-mono text-xs uppercase tracking-widest">
                    © {new Date().getFullYear()} Alfahad Niloy
                </p>
            </footer>
        </main>
    );
}
