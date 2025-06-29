function parseBBCode(input: string): string {
    return input
        .replace(/\[b([^\]]*)\](.*?)\[\/b\]/g, (match, attrs, content) => {
            // Если есть атрибут class, добавляем его в тег
            const classMatch = attrs.match(/class='([^']+)'/);
            const className = classMatch ? ` class="${classMatch[1]}"` : '';
            return `<strong ${className}>${content}</strong>`;
        })
        .replace(/\[i([^\]]*)\](.*?)\[\/i\]/g, (match, attrs, content) => {
            const classMatch = attrs.match(/class='([^']+)'/);
            const className = classMatch ? ` class="${classMatch[1]}"` : '';
            return `<em ${className}>${content}</em>`;
        })
        .replace(/\[u([^\]]*)\](.*?)\[\/u\]/g, (match, attrs, content) => {
            const classMatch = attrs.match(/class='([^']+)'/);
            const className = classMatch ? ` class="${classMatch[1]}"` : '';
            return `<u ${className}>${content}</u>`;
        })
        .replace(/\[br([^\]]*)\]/g, '<br>') // Перенос строки
        .replace(/\[code([^\]]*)\](.*?)\[\/code\]/g, (match, attrs, content) => {
            const classMatch = attrs.match(/class='([^']+)'/);
            const className = classMatch ? ` class="${classMatch[1]}"` : '';
            return `<pre ${className}><code>${content}</code></pre>`;
        })
        .replace(/\[url=([^\]]+)\]([^[]+)\[\/url\]/g, (match, url, content) => {
            return `<a href="${url}" class="link">${content}</a>`;
        });
}

export const BBCodeRenderer: React.FC<{ text: string; className?: string }> = ({
    text,
    className,
}) => {
    return <span className={className} dangerouslySetInnerHTML={{ __html: parseBBCode(text) }} />;
};
