import Badge from "./Badge"

interface UserCardProps {
    name: string;
    email: string;
    role: "admin" | "user";
    age: number;
    isAdmin?: boolean;
}


function UserCard({ name, email, role, age, isAdmin }: UserCardProps) {
    return (
        <div>

            <h2>{name}</h2>
            <p>{email}</p>
            <p>{role}</p>
            <p>{age}</p>
            {isAdmin && <Badge text = "admin" color="red" />}
        </div>
    );
}

export default UserCard;