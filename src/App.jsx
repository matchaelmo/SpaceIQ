import { useEffect } from 'react';

const navLinks = ['Features', 'Sample Office', 'Pricing', 'Resources', 'About'];
const trustTags = ['AI-Powered Analysis', 'Secure & Private', 'Built for Teams'];

const metrics = [
  { value: '24', label: 'Rooms Detected' },
  { value: '118', label: 'Assets Tracked' },
  { value: '6', label: 'Smart Routes' },
  { value: '95%', label: 'Faster Planning' }
];

const capabilities = [
  {
    title: 'Room Detection',
    description: 'Convert static plans into structured room data with hallways, offices, focus rooms, and shared spaces clearly identified.'
  },
  {
    title: 'Asset Planning',
    description: 'Place desks, printers, lockers, AV equipment, and department neighborhoods before teams arrive on site.'
  },
  {
    title: 'Wayfinding Maps',
    description: 'Generate polished maps and route guidance so employees, visitors, and movers can navigate every floor with confidence.'
  },
  {
    title: 'Project Tracking',
    description: 'Track relocation milestones, ownership, readiness, and change requests in one workplace command center.'
  }
];

const steps = [
  ['Upload', 'Drop in a floor plan PDF or image and establish a single workspace source of truth.'],
  ['AI Analysis', 'Detect rooms, hallways, zones, and planning opportunities with intelligent spatial analysis.'],
  ['Plan & Optimize', 'Model teams, assets, capacities, adjacency needs, and routes before making physical changes.'],
  ['Manage & Track', 'Coordinate moves, approvals, punch lists, and status updates from planning to opening day.']
];

const teams = ['Real Estate & CRE', 'Workplace Teams', 'Facilities Managers', 'Consultants', 'Universities'];

const legend = [
  ['Work Area', 'legend-work'],
  ['Meeting Room', 'legend-meeting'],
  ['Office', 'legend-office'],
  ['Common Area', 'legend-common'],
  ['Utility', 'legend-utility']
];

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <section className="hero-wrap">
        <nav className="navbar reveal" aria-label="Primary navigation">
          <a className="logo" href="/SpaceIQ/" aria-label="SpaceIQ home">
            <span className="logo-mark">S</span>
            <span>SpaceIQ</span>
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a href={`#${link.toLowerCase().replaceAll(' ', '-')}`} key={link}>{link}</a>
            ))}
          </div>

          <div className="nav-actions">
            <a className="signin-link" href="#signin">Sign in</a>
            <a className="nav-cta" href="#upload">Upload Floor Plan</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Modern workplace intelligence</p>
            <h1>Turn floor plans into intelligent workplaces.</h1>
            <p className="hero-subtitle">
              Upload a floor plan, detect rooms and hallways, plan office assets, generate wayfinding maps,
              and manage relocations with confidence.
            </p>

            <div className="hero-actions" id="upload">
              <a className="primary-button" href="#upload">Upload Floor Plan</a>
              <a className="secondary-button" href="#sample-office">View Sample Office</a>
            </div>

            <div className="trust-tags" aria-label="SpaceIQ trust markers">
              {trustTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <section className="dashboard-card reveal" id="sample-office" aria-label="Headquarters third floor dashboard preview">
            <div className="dashboard-topbar">
              <div>
                <p>Live floor intelligence</p>
                <h2>Headquarters – 3rd Floor</h2>
              </div>
              <div className="view-controls" aria-label="Map controls">
                <button type="button">2D</button>
                <button type="button">3D</button>
                <button type="button">＋</button>
                <button type="button">−</button>
              </div>
            </div>

            <div className="dashboard-body">
              <div className="floor-map" aria-label="Office floor plan map">
                <div className="route-line" aria-hidden="true"></div>
                <div className="room room-a">Open Workspace</div>
                <div className="room room-b">Board Room</div>
                <div className="room room-c">Office</div>
                <div className="room room-d">Lounge</div>
                <div className="room room-e">Focus Pods</div>
                <div className="room room-f">IT</div>
                <div className="hallway-label">Main Hallway</div>
                <div className="desk desk-1"></div>
                <div className="desk desk-2"></div>
                <div className="desk desk-3"></div>
                <div className="desk desk-4"></div>
                <div className="desk desk-5"></div>
                <div className="desk desk-6"></div>
              </div>

              <aside className="insights-panel" aria-label="Floor plan statistics and legend">
                <div className="stat-stack">
                  <div><strong>24</strong><span>Rooms</span></div>
                  <div><strong>118</strong><span>Assets</span></div>
                  <div><strong>6</strong><span>Routes</span></div>
                </div>
                <div className="legend">
                  <p>Legend</p>
                  {legend.map(([label, className]) => (
                    <span key={label}><i className={className}></i>{label}</span>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>

      <section className="metrics-strip reveal" aria-label="SpaceIQ planning metrics">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="content-section reveal" id="features">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Everything you need to plan smarter workplaces</h2>
        </div>
        <div className="card-grid four-up">
          {capabilities.map((capability) => (
            <article className="capability-card reveal" key={capability.title}>
              <div className="card-icon">✦</div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-section reveal" id="resources">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>From floor plan to better decisions</h2>
        </div>
        <div className="steps-grid">
          {steps.map(([title, description], index) => (
            <article className="step-card reveal" key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section reveal" id="about">
        <div className="section-heading center-heading">
          <p className="eyebrow">Who uses SpaceIQ</p>
          <h2>Built for every team shaping the future of work</h2>
        </div>
        <div className="team-grid">
          {teams.map((team) => (
            <article className="team-card reveal" key={team}>
              <span></span>
              <h3>{team}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-band reveal" id="pricing">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Start with one floor. Scale across every workplace.</h2>
        </div>
        <a className="primary-button" href="mailto:hello@spaceiq.example">Talk to Sales</a>
      </section>

      <footer className="footer reveal">
        <div className="footer-brand">
          <a className="logo" href="/SpaceIQ/" aria-label="SpaceIQ home">
            <span className="logo-mark">S</span>
            <span>SpaceIQ</span>
          </a>
          <p>Floor plan intelligence for teams building better workplaces.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#sample-office">Sample Office</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="#resources">Guides</a>
            <a href="#security">Security</a>
            <a href="#support">Support</a>
          </div>
          <form className="signup-form">
            <h4>Stay in the loop</h4>
            <label htmlFor="email-signup">Work email</label>
            <div>
              <input id="email-signup" type="email" placeholder="you@company.com" />
              <button type="submit">Join</button>
            </div>
          </form>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SpaceIQ. All rights reserved.</span>
          <div>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
