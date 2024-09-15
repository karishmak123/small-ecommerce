import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/auth.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (users.some(user => user.email === email)) {
      setError('User already registered. Please login.');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
          </div>
          <div className={styles.auth_buttonWrapper}>
            <button type="submit" className={styles.auth_submitButton}>Register</button>
          </div>
        </form>
        <div className={styles.signupContainer}>
          <p>Already have an account? <a href="/login" className={styles.signupLink}>Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
