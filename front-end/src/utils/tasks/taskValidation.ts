export function taskValidation (taskInput: string) {
    const trimmed = taskInput.trim()
    if (!trimmed.length) { 
        return {isValid: false, error: "Название не может быть меньше 4-ёх символов!"}
    }   else if (trimmed.length > 0 && trimmed.length <= 3){
        return {isValid: false, error: "Название не может быть меньше 4-ёх символов!"}
    }   else if (trimmed.length >= 250) {
        return {isValid: false, error: "Название не может быть больше 250-ёх символов!"}
    }   else {
        return {isValid: true}
    }
} 



