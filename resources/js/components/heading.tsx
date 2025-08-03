export default function Heading({ title, description, marginBottom = 'mb-8' }: { title: string; description?: string; marginBottom?: string }) {
    return (
        <div className={`${marginBottom} space-y-0.5`}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}
