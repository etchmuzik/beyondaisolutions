import { AuthLayoutProps } from './types';
import { authLayoutStyles as styles } from './styles';

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {/* Left side - Form */}
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
          alt="Office"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />
      </div>
    </div>
  );
}