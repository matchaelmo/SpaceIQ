import { useEffect, useRef, useState } from 'react';

const navLinks = ['Features', 'Sample Office', 'Pricing', 'Resources', 'About'];
const trustTags = ['AI-Powered Analysis', 'Secure & Private', 'Built for Teams'];

const planningItems = [
  'Rooms & departments',
  'Assets & equipment',
  'Routes & wayfinding',
  'Move tasks & readiness'
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


const analysisResults = [
  {
    title: 'Detected spaces',
    items: ['Rooms found', 'Hallways found', 'Bathrooms found', 'Shared areas found']
  },
  {
    title: 'Organization suggestions',
    items: [
      'Reception near entrance',
      'HR near reception/interview rooms',
      'Finance in quieter private area',
      'Operations near storage/support spaces'
    ]
  },
  {
    title: 'Asset placement suggestions',
    items: [
      'Cameras at entrances and hallway intersections',
      'Trash cans near pantry and shared areas',
      'Printers near central work zones',
      'Cabinets near departments with physical records'
    ]
  },
  {
    title: 'Optimization next steps',
    items: ['Confirm room labels', 'Assign departments', 'Place assets', 'Generate wayfinding map']
  }
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      setPreviewUrl('');
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [selectedFile]);

  const handleFile = (file) => {
    if (!file) return;

    const isAccepted = /\.(pdf|png|jpe?g)$/i.test(file.name);
    if (!isAccepted) {
      setFileError('Please upload a PDF, PNG, JPG, or JPEG file.');
      setSelectedFile(null);
      setShowResults(false);
      setIsAnalyzing(false);
      return;
    }

    setFileError('');
    setSelectedFile(file);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setShowResults(false);

    window.setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1000);
  };

  const isPdf = selectedFile?.type === 'application/pdf' || selectedFile?.name.toLowerCase().endsWith('.pdf');

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
            <a className="nav-cta" href="#upload-section">Upload Floor Plan</a>
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

            <div className="hero-actions" id="hero-actions">
              <a className="primary-button" href="#upload-section">Upload Floor Plan</a>
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

      <section className="planning-strip reveal" aria-labelledby="planning-heading">
        <div>
          <p className="eyebrow">Planning focus</p>
          <h2 id="planning-heading">What SpaceIQ helps you plan</h2>
        </div>
        <div className="planning-items">
          {planningItems.map((item) => (
            <article className="planning-item" key={item}>
              <span>✦</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="upload-section reveal" id="upload-section" aria-labelledby="upload-heading">
        <div className="section-heading center-heading">
          <p className="eyebrow">First workflow</p>
          <h2 id="upload-heading">Upload your floor plan</h2>
          <p className="section-subtitle">
            Start with a PDF or image. This prototype lets you preview the file and view staged planning outputs.
          </p>
        </div>

        <div className="upload-workflow">
          <div
            className="dropzone"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="dropzone-icon">↑</div>
            <h3>Drag and drop a floor plan</h3>
            <p>Accepts PDF, PNG, JPG, and JPEG files.</p>
            <button type="button" className="secondary-button light-button" onClick={() => fileInputRef.current?.click()}>
              Choose file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              onChange={handleFileChange}
            />
            {fileError && <p className="file-error" role="alert">{fileError}</p>}
          </div>

          <div className="file-panel" aria-live="polite">
            <p className="panel-label">Selected file</p>
            {selectedFile ? (
              <>
                <h3>{selectedFile.name}</h3>
                {previewUrl ? (
                  <img className="image-preview" src={previewUrl} alt={`Preview of ${selectedFile.name}`} />
                ) : isPdf ? (
                  <div className="pdf-preview">
                    <span>PDF</span>
                    <strong>{selectedFile.name}</strong>
                    <p>PDF floor plan ready for prototype analysis.</p>
                  </div>
                ) : (
                  <div className="pdf-preview">
                    <span>FILE</span>
                    <strong>{selectedFile.name}</strong>
                    <p>File selected and ready for prototype analysis.</p>
                  </div>
                )}
                <button type="button" className="primary-button analyze-button" onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing prototype...' : 'Analyze Floor Plan'}
                </button>
              </>
            ) : (
              <div className="empty-file-state">
                <span>No file selected yet</span>
                <p>Your preview and prototype analysis controls will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {isAnalyzing && (
          <div className="analysis-loading" role="status">
            <span></span>
            Preparing prototype analysis results...
          </div>
        )}

        {showResults && (
          <div className="analysis-results reveal is-visible">
            <div className="results-heading">
              <p className="eyebrow">Prototype only</p>
              <h3>Prototype analysis results</h3>
              <p>These are staged example results for product exploration. SpaceIQ is not performing real AI analysis yet.</p>
            </div>
            <div className="results-grid">
              {analysisResults.map((section) => (
                <article className="result-card" key={section.title}>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}
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
