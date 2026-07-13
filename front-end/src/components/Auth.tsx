import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают!');
      return;
    }

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`https://back-end-production-2590.up.railway.app${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (!isRegister) {
          setAuth(data.token, data.user);
          onClose();
        } else {
          setIsRegister(false);
          setError('Регистрация успешна! Теперь войдите.');
        }
      } else {
        setError(data.error || 'Ошибка');
      }
    } catch (err) {
      setError('Ошибка сети');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Логин"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit">{isRegister ? 'Создать аккаунт' : 'Войти'}</button>
        </form>

        <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
        </button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};
