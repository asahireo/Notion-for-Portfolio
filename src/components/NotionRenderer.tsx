import { NotionBlock } from '@/lib/notion';

interface NotionRendererProps {
    blocks: NotionBlock[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
    return (
        <div className="notion-content space-y-6">
            {blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}

function BlockRenderer({ block }: { block: NotionBlock }) {
    switch (block.type) {
        case 'paragraph':
            if (!block.content) return <div className="h-4" />;
            return (
                <p className="text-brand-light/80 leading-relaxed text-base sm:text-lg">
                    {block.content}
                </p>
            );

        case 'heading_1':
            return (
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-light mt-12 mb-4">
                    {block.content}
                </h1>
            );

        case 'heading_2':
            return (
                <h2 className="text-2xl sm:text-3xl font-semibold text-brand-light mt-10 mb-3">
                    {block.content}
                </h2>
            );

        case 'heading_3':
            return (
                <h3 className="text-xl sm:text-2xl font-medium text-brand-light mt-8 mb-2">
                    {block.content}
                </h3>
            );

        case 'bulleted_list_item':
            return (
                <div className="flex gap-3 ml-4">
                    <span className="text-brand-neon mt-1.5">•</span>
                    <p className="text-brand-light/80 leading-relaxed">{block.content}</p>
                </div>
            );

        case 'numbered_list_item':
            return (
                <div className="flex gap-3 ml-4">
                    <span className="text-brand-neon font-mono text-sm mt-0.5">1.</span>
                    <p className="text-brand-light/80 leading-relaxed">{block.content}</p>
                </div>
            );

        case 'code':
            return (
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-neon/20 to-brand-neon/5 rounded-xl blur-sm opacity-50" />
                    <pre className="relative bg-black/60 border border-white/10 rounded-xl p-4 sm:p-6 overflow-x-auto">
                        <code className="text-sm font-mono text-brand-light/90 leading-relaxed">
                            {block.content}
                        </code>
                    </pre>
                    {block.language && (
                        <span className="absolute top-3 right-3 text-[10px] font-mono text-brand-neon/50 uppercase tracking-wider">
                            {block.language}
                        </span>
                    )}
                </div>
            );

        case 'quote':
            return (
                <blockquote className="relative pl-6 border-l-2 border-brand-neon/50 py-2">
                    <p className="text-brand-light/70 italic text-lg leading-relaxed">
                        {block.content}
                    </p>
                </blockquote>
            );

        case 'callout':
            return (
                <div className="flex gap-4 p-4 sm:p-6 rounded-xl bg-brand-neon/5 border border-brand-neon/20">
                    <span className="text-2xl">💡</span>
                    <p className="text-brand-light/80 leading-relaxed">{block.content}</p>
                </div>
            );

        case 'image':
            if (!block.url) return null;
            return (
                <figure className="my-8">
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                        <img
                            src={block.url}
                            alt={block.caption || 'Image'}
                            className="w-full h-auto"
                        />
                    </div>
                    {block.caption && (
                        <figcaption className="mt-3 text-center text-sm text-brand-light/40 italic">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'divider':
            return (
                <div className="flex items-center justify-center py-8">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-neon/30 to-transparent" />
                </div>
            );

        default:
            return null;
    }
}
