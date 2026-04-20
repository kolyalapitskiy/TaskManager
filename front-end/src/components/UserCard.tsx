import Badge from "./Badge"

interface UserCardProps {
    name: string;
    email: string;
    role: "admin" | "user";
    id: number;
    isAdmin?: boolean;
}


function UserCard({ name, email, role, id, isAdmin }: UserCardProps) {
    return (
        <div>

            <h2>{name}</h2>
            <p>{email}</p>
            <p>{role}</p>
            <p>{id}</p>
            {isAdmin && <Badge text = "admin" color="red" />}
        </div>
    );
}

export default UserCard;