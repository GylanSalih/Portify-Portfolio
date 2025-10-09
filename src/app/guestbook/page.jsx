'use client';
import './guestbook.css';

export default function Guestbook() {
  return (
    <div className="container mx-auto">
      <h1 className="guestbook-title">Guestbook</h1>
      <p className="guestbook-description">Leave a message in the guestbook!</p>
      
      {/* Hier kannst du deine eigene Guestbook-Implementierung hinzufügen */}
      <div className="guestbook-content">
        <p>Dein eigenes Guestbook wird hier implementiert...</p>
      </div>
    </div>
  );
}
