// Testing Grid Page - Moderne Grid-Komponente zum Testen

import ModernGrid from '../components/PortfolioGrid/ModernGrid/ModernGrid';
import './testing-grid.css';

export default function TestingGridPage() {
  return (
    <div className="testing-grid-page">
      <div className="testing-header">
        <h1>Testing - Modern Grid Layout</h1>
        <p>Hier kannst du das neue moderne Grid-Layout testen und vergleichen.</p>
      </div>
      
      <ModernGrid />
    </div>
  );
}
