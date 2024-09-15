import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useRouter } from 'next/router';
import styles from '../styles/auth.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            dispatch(login(user));  
            router.push('/'); 
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Login</h1>
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
                        <button type="submit" className={styles.auth_submitButton}>Login</button>
                    </div>

                </form>
                <div className={styles.signupContainer}>
                    <p>Don't have an account? <a href="/register" className={styles.signupLink}>Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
