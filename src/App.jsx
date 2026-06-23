import { useEffect, useRef, useState } from 'react';

const navLinks = ['Features', 'Sample Office', 'Pricing', 'Resources', 'About'];
const trustTags = ['Prototype Analysis', 'Secure & Private', 'Built for Teams'];
const planningItems = ['Rooms & departments', 'Assets & equipment', 'Routes & wayfinding', 'Move tasks & readiness'];

const capabilities = [
  ['Room Detection', 'Structure rooms, hallways, offices, and shared areas from a floor plan workspace.'],
  ['Asset Planning', 'Plan desks, equipment, storage, support spaces, and department neighborhoods.'],
  ['Wayfinding Maps', 'Create clearer paths for teams, visitors, and relocation partners.'],
  ['Project Tracking', 'Coordinate owners, due dates, statuses, and move-readiness tasks.']
];

const detectedSpaces = [
  'Hallways',
  'Conference Rooms',
  'Offices',
  'Cubicles',
  'Open Workspaces',
  'Bathrooms',
  'Pantry / Storage',
  'Reception'
];

const detectedLabels = ['Main Hallway', 'Conference Room A', 'Reception', 'Open Workspace', 'Storage Room'];

const initialTasks = [
  { name: 'Confirm room labels', owner: 'Maya Chen', status: 'In Progress', dueDate: 'Jul 08' },
  { name: 'Assign departments', owner: 'Jordan Lee', status: 'Not Started', dueDate: 'Jul 11' },
  { name: 'Place assets and equipment', owner: 'Avery Kim', status: 'Not Started', dueDate: 'Jul 15' },
  { name: 'Generate wayfinding map', owner: 'Sam Patel', status: 'Not Started', dueDate: 'Jul 18' },
  { name: 'Review relocation readiness', owner: 'Riley Stone', status: 'Complete', dueDate: 'Jul 22' }
];

const statusOptions = ['Not Started', 'In Progress', 'Complete'];

const teams = ['Real Estate & CRE', 'Workplace Teams', 'Facilities Managers', 'Consultants', 'Universities'];

const legend = [
  ['Work Area', 'legend-work'],
  ['Meeting Room', 'legend-meeting'],
  ['Office', 'legend-office'],
  ['Common Area', 'legend-common'],
  ['Utility', 'legend-utility']
];

function FloorPlanMockup() {
  return (
    <div className="floor-map" aria-label="Sample office floor plan map">
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
  );
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activePanel, setActivePanel] = useState('analysis');
  const [viewMode, setViewMode] = useState('split');
  const [tasks, setTasks] = useState(initialTasks);
  const fileInputRef = useRef(null);
  const setupRef = useRef(null);
  const dashboardRef = useRef(null);

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

  const handleGetStarted = () => {
    setupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!/\.(pdf|png|jpe?g)$/i.test(file.name)) {
      setFileError('Please upload a PDF, PNG, JPG, or JPEG file.');
      setSelectedFile(null);
      return;
    }

    setFileError('');
    setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setIsAnalyzing(false);
      setViewMode('split');
      setActivePanel('analysis');
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  const updateTaskStatus = (taskName, nextStatus) => {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.name === taskName ? { ...task, status: nextStatus } : task
    )));
  };

  const isPdf = selectedFile?.type === 'application/pdf' || selectedFile?.name.toLowerCase().endsWith('.pdf');
  const showFloorPlan = viewMode === 'floor' || viewMode === 'split' || viewMode === 'project';
  const showPanel = viewMode === 'split' || viewMode === 'analysis' || viewMode === 'project';
  const currentPanel = viewMode === 'project' ? 'project' : activePanel;

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
            <button className="nav-cta" type="button" onClick={handleGetStarted}>Get Started</button>
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
              <button className="primary-button" type="button" onClick={handleGetStarted}>Get Started</button>
              <a className="secondary-button" href="#sample-office">View Sample Office</a>
            </div>

            <div className="trust-tags" aria-label="SpaceIQ trust markers">
              {trustTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>

          <section className="dashboard-card reveal" id="sample-office" aria-label="Headquarters third floor dashboard preview">
            <div className="dashboard-topbar">
              <div>
                <p>Shared workspace preview</p>
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
              <FloorPlanMockup />
              <aside className="insights-panel" aria-label="Floor plan statistics and legend">
                <div className="stat-stack">
                  <div><strong>24</strong><span>Rooms</span></div>
                  <div><strong>118</strong><span>Assets</span></div>
                  <div><strong>6</strong><span>Routes</span></div>
                </div>
                <div className="legend">
                  <p>Legend</p>
                  {legend.map(([label, className]) => <span key={label}><i className={className}></i>{label}</span>)}
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
          {planningItems.map((item) => <article className="planning-item" key={item}><span>✦</span><h3>{item}</h3></article>)}
        </div>
      </section>

      <section className="workspace-setup reveal" id="workspace-setup" ref={setupRef} aria-labelledby="setup-heading">
        <div className="section-heading center-heading">
          <p className="eyebrow">Workspace Setup</p>
          <h2 id="setup-heading">Start a shared workspace</h2>
          <p className="section-subtitle">
            Upload a plan, open the sample office, or jump into project management. The hero stays focused on the product story; setup happens here.
          </p>
        </div>

        <div className="setup-grid">
          <div
            className="dropzone"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleFile(event.dataTransfer.files?.[0]);
            }}
          >
            <div className="dropzone-icon">↑</div>
            <h3>Upload floor plan area</h3>
            <p>Drag and drop a PDF, PNG, JPG, or JPEG file, or choose one from your device.</p>
            <button type="button" className="secondary-button light-button" onClick={() => fileInputRef.current?.click()}>
              Choose file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            {fileError && <p className="file-error" role="alert">{fileError}</p>}
          </div>

          <div className="setup-side-panel">
            <div className="file-panel" aria-live="polite">
              <p className="panel-label">Selected file</p>
              {selectedFile ? (
                <>
                  <h3>{selectedFile.name}</h3>
                  {previewUrl ? (
                    <img className="image-preview" src={previewUrl} alt={`Preview of ${selectedFile.name}`} />
                  ) : isPdf ? (
                    <div className="pdf-preview"><span>PDF</span><strong>{selectedFile.name}</strong><p>PDF floor plan ready for prototype analysis.</p></div>
                  ) : (
                    <div className="pdf-preview"><span>FILE</span><strong>{selectedFile.name}</strong><p>File selected and ready for prototype analysis.</p></div>
                  )}
                  <button type="button" className="primary-button analyze-button" onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing prototype...' : 'Analyze Floor Plan'}
                  </button>
                </>
              ) : (
                <div className="empty-file-state"><span>No file selected yet</span><p>Your preview and Analyze Floor Plan button will appear here.</p></div>
              )}
            </div>

            <div className="setup-actions-card">
              <a className="secondary-button light-button" href="#sample-office">View Sample Office</a>
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setViewMode('project');
                  setActivePanel('project');
                  dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Open Project Management
              </button>
            </div>
          </div>
        </div>
      </section>

      {isAnalyzing && (
        <div className="analysis-loading" role="status">
          <span></span>
          Preparing shared workspace dashboard...
        </div>
      )}

      <section className={`workspace-dashboard ${showFloorPlan && showPanel ? 'split-dashboard' : 'single-dashboard'} reveal is-visible`} ref={dashboardRef} aria-labelledby="dashboard-heading">
        <header className="workspace-header">
          <a className="logo" href="/SpaceIQ/" aria-label="SpaceIQ home"><span className="logo-mark">S</span><span>SpaceIQ</span></a>
          <div>
            <p className="eyebrow">Workspace Dashboard</p>
            <h2 id="dashboard-heading">Shared planning workspace</h2>
          </div>
          <div className="view-mode-controls" aria-label="Dashboard view modes">
            <button type="button" className={viewMode === 'floor' ? 'active' : ''} onClick={() => setViewMode('floor')}>Floor Plan Only</button>
            <button type="button" className={viewMode === 'split' ? 'active' : ''} onClick={() => setViewMode('split')}>Split View</button>
            <button type="button" className={viewMode === 'analysis' ? 'active' : ''} onClick={() => { setViewMode('analysis'); setActivePanel('analysis'); }}>Analysis Only</button>
            <button type="button" className={viewMode === 'project' ? 'active' : ''} onClick={() => { setViewMode('project'); setActivePanel('project'); }}>Project Management</button>
          </div>
        </header>

        <div className="workspace-main">
          {showFloorPlan && (
            <section className="floor-viewer" aria-label="Floor plan viewer">
              <div className="viewer-toolbar">
                <strong>{selectedFile?.name || 'Sample Office Floor Plan'}</strong>
                <div>
                  <button type="button">Zoom In</button>
                  <button type="button">Zoom Out</button>
                  <button type="button">Fit View</button>
                  <button type="button">2D</button>
                </div>
              </div>
              <div className="uploaded-plan-preview">
                {previewUrl ? (
                  <img src={previewUrl} alt={`Uploaded floor plan preview for ${selectedFile.name}`} />
                ) : isPdf ? (
                  <div className="pdf-preview dashboard-pdf"><span>PDF</span><strong>{selectedFile.name}</strong><p>PDF preview placeholder in the shared workspace.</p></div>
                ) : (
                  <FloorPlanMockup />
                )}
              </div>
            </section>
          )}

          {showPanel && (
            <aside className="workspace-panel" aria-label="Analysis and project management panel">
              {viewMode !== 'project' && (
                <div className="panel-tabs">
                  <button type="button" className={currentPanel === 'analysis' ? 'active' : ''} onClick={() => setActivePanel('analysis')}>AI Analysis</button>
                  <button type="button" className={currentPanel === 'project' ? 'active' : ''} onClick={() => setActivePanel('project')}>Project Management</button>
                </div>
              )}

              {currentPanel === 'analysis' ? (
                <div className="analysis-panel-content">
                  <p className="panel-label">Prototype AI Analysis</p>
                  <h3>Detected space categories</h3>
                  <p>This is prototype analysis for workflow design. SpaceIQ is not performing real AI analysis yet.</p>
                  <div className="detected-grid">
                    {detectedSpaces.map((space) => <span key={space}>{space}</span>)}
                  </div>
                  <h4>Detected Labels</h4>
                  <ul className="detected-labels">
                    {detectedLabels.map((label) => <li key={label}>{label}</li>)}
                  </ul>
                </div>
              ) : (
                <div className="project-panel-content">
                  <p className="panel-label">Project Management</p>
                  <h3>Relocation tasks</h3>
                  <div className="task-list">
                    {tasks.map((task) => (
                      <article className="task-card" key={task.name}>
                        <div>
                          <h4>{task.name}</h4>
                          <p>{task.owner} · Due {task.dueDate}</p>
                        </div>
                        <select value={task.status} onChange={(event) => updateTaskStatus(task.name, event.target.value)}>
                          {statusOptions.map((status) => <option value={status} key={status}>{status}</option>)}
                        </select>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </section>

      <section className="content-section reveal" id="features">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Everything you need to plan smarter workplaces</h2>
        </div>
        <div className="card-grid four-up">
          {capabilities.map(([title, description]) => (
            <article className="capability-card reveal" key={title}><div className="card-icon">✦</div><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="content-section reveal" id="about">
        <div className="section-heading center-heading"><p className="eyebrow">Who uses SpaceIQ</p><h2>Built for every team shaping the future of work</h2></div>
        <div className="team-grid">{teams.map((team) => <article className="team-card reveal" key={team}><span></span><h3>{team}</h3></article>)}</div>
      </section>

      <section className="pricing-band reveal" id="pricing"><div><p className="eyebrow">Pricing</p><h2>Start with one floor. Scale across every workplace.</h2></div><a className="primary-button" href="mailto:hello@spaceiq.example">Talk to Sales</a></section>

      <footer className="footer reveal">
        <div className="footer-brand"><a className="logo" href="/SpaceIQ/" aria-label="SpaceIQ home"><span className="logo-mark">S</span><span>SpaceIQ</span></a><p>Floor plan intelligence for teams building better workplaces.</p></div>
        <div className="footer-links">
          <div><h4>Product</h4><a href="#features">Features</a><a href="#sample-office">Sample Office</a><a href="#pricing">Pricing</a></div>
          <div><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#contact">Contact</a></div>
          <div><h4>Resources</h4><a href="#resources">Guides</a><a href="#security">Security</a><a href="#support">Support</a></div>
          <form className="signup-form"><h4>Stay in the loop</h4><label htmlFor="email-signup">Work email</label><div><input id="email-signup" type="email" placeholder="you@company.com" /><button type="submit">Join</button></div></form>
        </div>
        <div className="footer-bottom"><span>© 2026 SpaceIQ. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div>
      </footer>
    </main>
  );
}

export default App;
