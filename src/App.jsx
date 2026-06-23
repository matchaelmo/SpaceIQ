const features = [
  {
    title: 'Room Detection',
    description: 'Identify offices, meeting rooms, collaboration zones, and circulation paths from uploaded floor plans.',
    icon: '▣'
  },
  {
    title: 'Asset Planning',
    description: 'Place desks, equipment, shared amenities, and team neighborhoods before move day.',
    icon: '◈'
  },
  {
    title: 'Wayfinding Maps',
    description: 'Publish clear workplace maps that help employees and visitors find the right room faster.',
    icon: '⌖'
  },
  {
    title: 'Project Tracking',
    description: 'Coordinate relocation milestones, readiness tasks, and space changes from one command center.',
    icon: '✓'
  }
];

export default function App() {
  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="/SpaceIQ/" aria-label="SpaceIQ home">
          <span className="brand-mark">S</span>
          <span>SpaceIQ</span>
        </a>
        <div className="nav-links" aria-label="Product sections">
          <a href="#features">Features</a>
          <a href="#sample">Sample office</a>
          <a href="#upload">Upload</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Intelligent workplace planning</p>
          <h1>SpaceIQ</h1>
          <h2>Turn floor plans into intelligent workplaces.</h2>
          <p className="subtitle">
            Upload a floor plan, detect rooms and hallways, plan office assets, generate wayfinding maps,
            and managing relocations.
          </p>
          <div className="hero-actions" id="upload">
            <a className="button button-primary" href="#upload-panel">Upload Floor Plan</a>
            <a className="button button-secondary" href="#sample">View Sample Office</a>
          </div>
        </div>

        <div className="workspace-preview" id="sample" aria-label="Sample office floor plan preview">
          <div className="preview-header" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="floor-plan">
            <div className="room room-large">Open Workspace</div>
            <div className="room room-small">Focus</div>
            <div className="room room-medium">Conference</div>
            <div className="hallway">Main Hallway</div>
            <div className="room room-medium">Design Lab</div>
            <div className="room room-small">Phone</div>
            <div className="room room-large">Team Suite</div>
          </div>
          <div className="preview-metrics" aria-label="Sample office metrics">
            <div>
              <strong>24</strong>
              <span>Rooms</span>
            </div>
            <div>
              <strong>118</strong>
              <span>Assets</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Routes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section" id="features" aria-labelledby="features-heading">
        <div className="section-heading">
          <p className="eyebrow">Platform capabilities</p>
          <h2 id="features-heading">Plan smarter workplaces from day one.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="upload-panel" id="upload-panel" aria-label="Floor plan upload callout">
        <div>
          <p className="eyebrow">Ready for your next move?</p>
          <h2>Start with a floor plan and build a workplace source of truth.</h2>
        </div>
        <a className="button button-primary" href="mailto:hello@spaceiq.example">Upload Floor Plan</a>
      </section>
    </main>
  );
}
