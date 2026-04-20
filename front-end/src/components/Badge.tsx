interface BadgeProps {
    text: string;
    color: string;
}

function Badge({text, color}: BadgeProps) {
    return (
        <span style={{ backgroundColor: color }}>
            {text}
        </span>
    );
}

export default Badge;