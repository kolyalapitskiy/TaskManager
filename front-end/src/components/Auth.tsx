// import { useState } from 'react';

// export const AuthModal = ({ isOpen, onClose, onAuthSuccess }: any) => {
//   const [isRegister, setIsRegister] = useState(false); // Переключатель Логин/Регистрация
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // 1. Валидация совпадения паролей (только при регистрации)
//     if (isRegister && formData.password !== formData.confirmPassword) {
//       setError('Пароли не совпадают!');
//       return;
//     }

//     const endpoint = isRegister ? '/api/register' : '/api/login';

//     try {
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Сохраняем токен (сделаем это в следующем шаге)
//         localStorage.setItem('token', data.token);
//         onAuthSuccess(data.username);
//         onClose();
//       } else {
//         // Выводим ошибку от сервера (например, "Email занят")
//         setError(data.error || 'Что-то пошло не так');
//       }
//     } catch (err) {
//       setError('Ошибка сети');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
//         <form onSubmit={handleSubmit}>
//           {isRegister && (
//             <input
//               type="text"
//               placeholder="Логин"
//               value={formData.username}
//               onChange={(e) => setFormData({...formData, username: e.target.value})}
//               required
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({...formData, email: e.target.value})}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Пароль"
//             value={formData.password}
//             onChange={(e) => setFormData({...formData, password: e.target.value})}
//             required
//           />
//           {isRegister && (
//             <input
//               type="password"
//               placeholder="Подтвердите пароль"
//               value={formData.confirmPassword}
//               onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//               required
//             />
//           )}

//           {error && <p className="error-text">{error}</p>}

//           <button type="submit">{isRegister ? 'Создать аккаунт' : 'Войти'}</button>
//         </form>

//         <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
//           {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
//         </button>
//         <button onClick={onClose}>Закрыть</button>
//       </div>
//     </div>
//   );
// };