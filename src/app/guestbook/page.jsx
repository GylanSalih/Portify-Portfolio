'use client';
import styles from './guestbook.module.scss';

export default function Guestbook() {
  return (
    <div className={`${styles.container} mx-auto`}>
      <h1 className={styles.title}>Guestbook</h1>
      <p className={styles.description}>Leave a message in the guestbook!</p>
      
      {/* Hier kannst du deine eigene Guestbook-Implementierung hinzufügen */}
      <div className="guestbook-content">
        <p>Dein eigenes Guestbook wird hier implementiert...</p>
      </div>
    </div>
  );
}
