function taskValidation (taskInput: string) {
    const trimmed = taskInput.trim()
    if(trimmed.length == 0) {
        return {isValid: false, error: "Название не может быть пустым!"}
    }   else if (trimmed.length <= 3){
        return {isValid: false, error: "Название не может быть меньше 4-ёх символов!"}
    }   else if (trimmed.length >= 250) {
        return {isValid: false, error: "Название не может быть меньше 4-ёх символов!"}
    }   else {
        return {isValid: true}
    }
} 



export default {taskValidation}