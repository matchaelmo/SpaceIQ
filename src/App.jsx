import { useEffect, useRef, useState } from 'react';
import './App.css';

const loadPdfJs = () => new Promise((resolve, reject) => {
  if (window.pdfjsLib) {
    resolve(window.pdfjsLib);
    return;
  }

  const existingScript = document.querySelector('script[data-pdfjs="true"]');
  if (existingScript) {
    existingScript.addEventListener('load', () => resolve(window.pdfjsLib));
    existingScript.addEventListener('error', () => reject(new Error('Unable to load PDF.js.')));
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  script.async = true;
  script.dataset.pdfjs = 'true';
  script.onload = () => resolve(window.pdfjsLib);
  script.onerror = () => reject(new Error('Unable to load PDF.js.'));
  document.body.appendChild(script);
});

const initialWorkspaceInfo = {
  organizationName: '',
  spaceType: 'Office',
  totalSquareFootage: '',
  numberOfFloors: '',
  totalStaffCount: '',
  privateOfficesNeeded: '',
  cubiclesNeeded: '',
  openWorkspaceSeatsNeeded: '',
  staffType: 'Permanent',
  moveDate: '',
  currentLocation: '',
  newLocation: '',
  budgetRange: '',
  specialRoomsNeeded: [],
  numberOfConferenceRooms: '',
  departments: [{ name: '', headcount: '' }]
};

const starterTasks = [
  {
    id: 'task-1001',
    name: 'Confirm demolition-safe circulation paths',
    liaison: 'Avery Stone',
    priority: 'High',
    dueDate: '2026-07-08',
    createdAt: '2026-06-24',
    status: 'In Progress',
    purpose: 'Validate temporary circulation routes before move crews arrive.',
    timelineNotes: 'Coordinate with facilities after the floor plan review.',
    collaborators: ['Avery Stone'],
    files: [],
    comments: [{ author: 'SpaceIQ', text: 'Initial relocation control task created.', timestamp: '6/24/2026, 09:00 AM' }]
  },
  {
    id: 'task-1002',
    name: 'Lock workstation asset counts',
    liaison: 'Mina Patel',
    priority: 'Medium',
    dueDate: '2026-07-15',
    createdAt: '2026-06-25',
    status: 'Not Started',
    purpose: 'Finalize desk, chair, monitor, and docking station quantities.',
    timelineNotes: '',
    collaborators: ['Mina Patel'],
    files: [],
    comments: []
  },
  {
    id: 'task-1003',
    name: 'Resolve east core freight elevator hold',
    liaison: 'Jon Lee',
    priority: 'Critical',
    dueDate: '2026-07-01',
    createdAt: '2026-06-20',
    status: 'Blocked',
    purpose: 'Clear the building management hold on freight elevator reservations.',
    timelineNotes: 'Waiting on certificate of insurance approval.',
    collaborators: ['Jon Lee', 'Ops'],
    files: [],
    comments: []
  },
  {
    id: 'task-1004',
    name: 'Publish department landing zones',
    liaison: 'Rae Kim',
    priority: 'Low',
    dueDate: '2026-07-19',
    createdAt: '2026-06-23',
    status: 'Complete',
    purpose: 'Share confirmed neighborhoods with department leads.',
    timelineNotes: 'Completed after second pass of the seating plan.',
    collaborators: ['Rae Kim'],
    files: [],
    comments: []
  }
];

const features = [
  ['Floor intelligence', 'Detect rooms, corridors, constraints, and relocation-ready work zones from a floor plan.'],
  ['Move command center', 'Track liaison ownership, blocked work, due dates, and live status across every crew.'],
  ['Asset staging', 'Plan desks, equipment, storage, and receiving zones before crews hit the dock.'],
  ['Wayfinding readiness', 'Turn static plans into practical routes for employees, vendors, and facilities teams.']
];

const statusColors = {
  'In Progress': '#f59e0b',
  Complete: '#22c55e',
  Blocked: '#ef4444',
  'Not Started': '#444444'
};

const priorityColors = {
  Low: '#888888',
  Medium: '#7c3aed',
  High: '#f59e0b',
  Critical: '#ef4444'
};

function Logo({ compact = false }) {
  return (
    <div className="logo" aria-label="SpaceIQ">
      <span className="logo-mark">S</span>
      {!compact && <span className="logo-word">SpaceIQ</span>}
    </div>
  );
}

function formatProjectName(workspaceInfo) {
  return workspaceInfo.organizationName || 'North Yard Relocation';
}

function formatMoveDate(moveDate) {
  if (!moveDate) return '2026-08-01';
  return moveDate;
}

function fileSize(size) {
  if (!size) return '0 KB';
  if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function Sidebar({ active, workspaceInfo, tasks, onNavigate }) {
  const complete = tasks.filter((task) => task.status === 'Complete').length;
  const percent = tasks.length ? Math.round((complete / tasks.length) * 100) : 0;
  const current = workspaceInfo.currentLocation || 'Current site TBD';
  const next = workspaceInfo.newLocation || 'New site TBD';
  const navItems = [
    ['dashboard', 'Floor Plan', false],
    ['analysis', 'Analysis', false],
    ['task-table', 'Task Table', false],
    ['assets', 'Assets', true],
    ['wayfinding', 'Wayfinding', true],
    ['team', 'Team', true]
  ];

  return (
    <aside className="sidebar">
      <div>
        <Logo />
        <div className="sidebar-project">
          <strong>{formatProjectName(workspaceInfo)}</strong>
          <span>{current} → {next}</span>
        </div>
        <nav className="sidebar-nav" aria-label="Workspace navigation">
          {navItems.map(([key, label, disabled]) => (
            <button
              key={key}
              type="button"
              className={`sidebar-link ${active === key ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onNavigate(key)}
              disabled={disabled}
            >
              <span>{label}</span>
              {disabled && <em>soon</em>}
            </button>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">
        <span className="label">Move date</span>
        <strong className="mono">{formatMoveDate(workspaceInfo.moveDate)}</strong>
        <div className="progress-meta"><span>{percent}% complete</span><span>{complete}/{tasks.length}</span></div>
        <div className="progress"><span style={{ width: `${percent}%` }} /></div>
      </div>
    </aside>
  );
}

function AppShell({ active, workspaceInfo, tasks, onNavigate, children }) {
  return (
    <main className="app-shell">
      <Sidebar active={active} workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={onNavigate} />
      <section className="app-main">{children}</section>
    </main>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <main className="landing-page">
      <nav className="landing-nav"><Logo /><div><a href="#features">Features</a><a href="#about">About</a><a href="#pricing">Pricing</a></div><button className="btn primary" type="button" onClick={onGetStarted}>Get Started</button></nav>
      <section className="hero">
        <p className="eyebrow">Industrial workplace intelligence</p>
        <h1>Move planning, stripped down to command-grade clarity.</h1>
        <p>SpaceIQ converts floor plans, relocation constraints, crew work, and stakeholder decisions into one dense operating system for high-pressure moves.</p>
        <button className="btn primary" type="button" onClick={onGetStarted}>Get Started</button>
      </section>
      <section id="features" className="feature-section">
        <p className="eyebrow">Capabilities</p>
        <h2>Built for facilities teams that need facts, not fluff.</h2>
        <div className="feature-grid">{features.map(([title, description]) => <article className="feature-card" key={title}><span>✦</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section id="about" className="band"><p className="eyebrow">About</p><h2>Linear-level focus for construction-grade workspace execution.</h2></section>
      <section id="pricing" className="pricing"><div><p className="eyebrow">Pricing</p><h2>Start with one floor. Scale across every move.</h2></div><button className="btn primary" type="button" onClick={onGetStarted}>Get Started</button></section>
      <footer className="landing-footer"><Logo /><span>© 2026 SpaceIQ. All rights reserved.</span></footer>
    </main>
  );
}

function WorkspaceInfoPage({ workspaceInfo, setWorkspaceInfo, onBack, onContinue }) {
  const specialRooms = ['Server Room', 'Reception', 'Storage', 'Break Room', 'Conference Rooms', 'Phone Booths'];
  const updateField = (field, value) => setWorkspaceInfo((current) => ({ ...current, [field]: value }));
  const toggleSpecialRoom = (room) => setWorkspaceInfo((current) => ({ ...current, specialRoomsNeeded: current.specialRoomsNeeded.includes(room) ? current.specialRoomsNeeded.filter((item) => item !== room) : [...current.specialRoomsNeeded, room] }));
  const updateDepartment = (index, field, value) => setWorkspaceInfo((current) => ({ ...current, departments: current.departments.map((department, departmentIndex) => departmentIndex === index ? { ...department, [field]: value } : department) }));
  const addDepartment = () => setWorkspaceInfo((current) => ({ ...current, departments: [...current.departments, { name: '', headcount: '' }] }));

  return (
    <main className="setup-page">
      <section className="setup-card">
        <div className="setup-top"><button className="btn ghost" type="button" onClick={onBack}>← Back</button><Logo /><button className="btn primary" type="button" onClick={onContinue}>Continue</button></div>
        <p className="eyebrow">Workspace Info</p><h1>Define the move envelope.</h1>
        <div className="form-grid">
          <label>Organization name<input value={workspaceInfo.organizationName} onChange={(event) => updateField('organizationName', event.target.value)} /></label>
          <label>Type of space<select value={workspaceInfo.spaceType} onChange={(event) => updateField('spaceType', event.target.value)}>{['Office', 'School', 'Clinic', 'Warehouse', 'Other'].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label>Total square footage<input type="number" value={workspaceInfo.totalSquareFootage} onChange={(event) => updateField('totalSquareFootage', event.target.value)} /></label>
          <label>Number of floors<input type="number" value={workspaceInfo.numberOfFloors} onChange={(event) => updateField('numberOfFloors', event.target.value)} /></label>
          <label>Total staff count<input type="number" value={workspaceInfo.totalStaffCount} onChange={(event) => updateField('totalStaffCount', event.target.value)} /></label>
          <label>Private offices needed<input type="number" value={workspaceInfo.privateOfficesNeeded} onChange={(event) => updateField('privateOfficesNeeded', event.target.value)} /></label>
          <label>Cubicles needed<input type="number" value={workspaceInfo.cubiclesNeeded} onChange={(event) => updateField('cubiclesNeeded', event.target.value)} /></label>
          <label>Open workspace seats needed<input type="number" value={workspaceInfo.openWorkspaceSeatsNeeded} onChange={(event) => updateField('openWorkspaceSeatsNeeded', event.target.value)} /></label>
          <label>Staff type<select value={workspaceInfo.staffType} onChange={(event) => updateField('staffType', event.target.value)}>{['Permanent', 'Seasonal', 'Mixed'].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label>Move date<input className="mono" type="date" value={workspaceInfo.moveDate} onChange={(event) => updateField('moveDate', event.target.value)} /></label>
          <label>Current location<input value={workspaceInfo.currentLocation} onChange={(event) => updateField('currentLocation', event.target.value)} /></label>
          <label>New location<input value={workspaceInfo.newLocation} onChange={(event) => updateField('newLocation', event.target.value)} /></label>
          <label>Budget range<input value={workspaceInfo.budgetRange} onChange={(event) => updateField('budgetRange', event.target.value)} /></label>
        </div>
        <div className="section-block"><h2>Special rooms needed</h2><div className="check-grid">{specialRooms.map((room) => <label key={room} className="check-row"><input type="checkbox" checked={workspaceInfo.specialRoomsNeeded.includes(room)} onChange={() => toggleSpecialRoom(room)} />{room}</label>)}</div>{workspaceInfo.specialRoomsNeeded.includes('Conference Rooms') && <label className="inline-label">Conference room count<input type="number" value={workspaceInfo.numberOfConferenceRooms} onChange={(event) => updateField('numberOfConferenceRooms', event.target.value)} /></label>}</div>
        <div className="section-block"><h2>Departments</h2>{workspaceInfo.departments.map((department, index) => <div className="department-row" key={index}><input placeholder="Department name" value={department.name} onChange={(event) => updateDepartment(index, 'name', event.target.value)} /><input placeholder="Headcount" type="number" value={department.headcount} onChange={(event) => updateDepartment(index, 'headcount', event.target.value)} /></div>)}<button className="btn outline" type="button" onClick={addDepartment}>Add Department</button></div>
      </section>
    </main>
  );
}

function UploadPage({ onBack, onContinue }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    let objectUrl = '';
    const preparePreview = async () => {
      setPreviewUrl('');
      if (!file) return;
      const fileIsPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (file.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(file);
        if (!isCancelled) setPreviewUrl(objectUrl);
      } else if (fileIsPdf) {
        try {
          const pdfjsLib = await loadPdfJs();
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          if (!isCancelled) setPreviewUrl(canvas.toDataURL('image/png'));
        } catch (pdfError) {
          if (!isCancelled) setError(pdfError.message || 'Unable to render the first PDF page.');
        }
      }
    };
    preparePreview();
    return () => { isCancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [file]);

  const handleFile = (nextFile) => {
    if (!nextFile) return;
    if (!/\.(pdf|png|jpe?g)$/i.test(nextFile.name)) { setError('Please upload a PDF, PNG, JPG, or JPEG file.'); return; }
    setFile(nextFile); setAnalysisResult(null); setError('');
  };

  const analyzeFloorPlan = (event) => {
    event.stopPropagation();
    if (!file) return;
    setAnalysisResult({ confidence: 'low', summary: 'Floor plan uploaded. Analysis queue staged for room detection.', rooms: [{ id: 'room-1', label: 'Open Work Zone', type: 'Open Workspace' }, { id: 'room-2', label: 'Conference Core', type: 'Conference Room' }, { id: 'room-3', label: 'Receiving / Staging', type: 'Storage' }] });
  };

  return (
    <main className="setup-page upload-page">
      <section className="upload-shell">
        <div className="setup-top"><button className="btn ghost" type="button" onClick={onBack}>← Back</button><Logo /><span /></div>
        <div className="upload-grid">
          <div className="dropzone" onClick={() => fileInputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files?.[0]); }}>
            <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" onChange={(event) => handleFile(event.target.files?.[0])} hidden />
            <div className="upload-icon">↑</div><h1>Upload a floor plan</h1><p>Drag and drop or click to upload a PDF, PNG, JPG, or JPEG file for analysis.</p><button className="btn outline" type="button">Choose File</button>
            {file && <div className="preview"><strong>{file.name}</strong>{previewUrl ? <img src={previewUrl} alt={`Preview of ${file.name}`} /> : <p className="muted">PDF preview loading</p>}<button className="btn primary" type="button" onClick={analyzeFloorPlan}>Analyze Floor Plan</button></div>}
            {error && <p className="error">{error}</p>}
          </div>
          <aside className="analysis-card"><p className="eyebrow">Analysis Results</p>{!analysisResult ? <p className="empty-state">Upload a plan and run analysis to stage detected rooms.</p> : <><h2>Detected rooms</h2><p className="muted">Confidence: {analysisResult.confidence}</p><p>{analysisResult.summary}</p><div className="room-list">{analysisResult.rooms.map((room) => <article key={room.id}><strong>{room.label}</strong><span>{room.type}</span></article>)}</div><button className="btn primary" type="button" onClick={() => onContinue({ file, previewUrl, analysisResult })}>Continue to Dashboard</button></>}</aside>
        </div>
      </section>
    </main>
  );
}

function DashboardPage({ floorData, workspaceInfo, tasks, onNavigate }) {
  const [viewMode, setViewMode] = useState('split');
  const rooms = floorData?.analysisResult?.rooms || [];
  const showFloorPlan = viewMode === 'split' || viewMode === 'floor';
  const showAnalysis = viewMode === 'split' || viewMode === 'analysis';

  return (
    <AppShell active="dashboard" workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={onNavigate}>
      <div className="dashboard-toolbar">{[['floor', 'Floor Plan Only'], ['split', 'Split View'], ['analysis', 'Analysis Only']].map(([mode, label]) => <button className={viewMode === mode ? 'active' : ''} key={mode} type="button" onClick={() => setViewMode(mode)}>{label}</button>)}</div>
      <section className="dashboard-grid" style={{ gridTemplateColumns: showFloorPlan && showAnalysis ? 'minmax(0, 1fr) 360px' : '1fr' }}>
        {showFloorPlan && <div className="floor-viewer"><div className="viewer-controls"><strong>{floorData?.file?.name || 'Floor Plan'}</strong><span>Zoom In</span><span>Zoom Out</span><span>Fit View</span></div><div className="viewer-canvas">{floorData?.previewUrl ? <img src={floorData.previewUrl} alt={`Uploaded floor plan preview for ${floorData.file?.name || 'floor plan'}`} /> : <div className="empty-state">No floor plan selected.</div>}</div></div>}
        {showAnalysis && <aside className="analysis-panel"><p className="eyebrow">Analysis</p><h1>Detected spaces</h1><p className="muted">Confidence: {floorData?.analysisResult?.confidence || 'N/A'}</p><p>{floorData?.analysisResult?.summary || 'No analysis summary available yet.'}</p><div className="room-list">{rooms.length ? rooms.map((room) => <article key={room.id}><strong>{room.label}</strong><span>{room.type}</span></article>) : <p className="muted">No detected rooms to display yet.</p>}</div></aside>}
      </section>
    </AppShell>
  );
}

function Badge({ label, color }) {
  return <span className="badge" style={{ '--badge': color }}>{label}</span>;
}

function TaskTabs({ view, setView }) {
  return <div className="task-tabs">{['Table', 'Gantt', 'Calendar', 'Board', 'Chart'].map((tab) => { const disabled = tab === 'Board' || tab === 'Chart'; return <button key={tab} className={view === tab ? 'active' : ''} type="button" disabled={disabled} onClick={() => !disabled && setView(tab)}>{tab}{disabled && <span>soon</span>}</button>; })}</div>;
}

function TaskTable({ tasks, onAdd }) {
  return <div className="task-table"><div className="task-head"><span>#</span><span>Task Name</span><span>Liaison</span><span>Priority</span><span>Due Date</span><span>Status</span></div>{tasks.map((task, index) => <div className="task-row" key={task.id}><span className="mono">{String(index + 1).padStart(3, '0')}</span><strong>{task.name || 'Untitled task'}</strong><span>{task.liaison || '—'}</span><span><Badge label={task.priority} color={priorityColors[task.priority]} /></span><span className="mono">{task.dueDate || '—'}</span><span><Badge label={task.status} color={statusColors[task.status]} /></span></div>)}<button className="add-row" type="button" onClick={onAdd}><span>+</span><em>Task name</em></button></div>;
}

function GanttView({ tasks }) {
  const dates = ['Jun 24', 'Jul 01', 'Jul 08', 'Jul 15', 'Jul 22'];
  return <div className="gantt"><div className="gantt-axis">{dates.map((date) => <span className="mono" key={date}>{date}</span>)}</div>{tasks.map((task, index) => <div className="gantt-row" key={task.id}><span>{task.name}</span><div><i style={{ background: statusColors[task.status], left: `${8 + index * 8}%`, width: `${24 + index * 7}%` }} /></div></div>)}</div>;
}

function CalendarView({ tasks }) {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  return <div className="calendar-grid">{days.map((day) => { const task = tasks.find((item) => Number(item.dueDate.split('-')[2]) === day); return <div className="calendar-cell" key={day}><span className="mono">{day}</span>{task && <p><i style={{ background: statusColors[task.status] }} />{task.name}</p>}</div>; })}</div>;
}

function TaskTablePage({ workspaceInfo, tasks, onNavigate, onAdd }) {
  const [view, setView] = useState('Table');
  return <AppShell active="task-table" workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={onNavigate}><TaskTabs view={view} setView={setView} />{view === 'Table' && <TaskTable tasks={tasks} onAdd={onAdd} />}{view === 'Gantt' && <GanttView tasks={tasks} />}{view === 'Calendar' && <CalendarView tasks={tasks} />}</AppShell>;
}

function TaskDetailPage({ workspaceInfo, tasks, draftTask, setDraftTask, onSave, onCancel, onNavigate }) {
  const [collaboratorName, setCollaboratorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const fileInputRef = useRef(null);
  const updateDraft = (field, value) => setDraftTask((current) => ({ ...current, [field]: value }));
  const addCollaborator = () => { if (!collaboratorName.trim()) return; updateDraft('collaborators', [...draftTask.collaborators, collaboratorName.trim()]); setCollaboratorName(''); };
  const attachFile = (file) => { if (!file) return; updateDraft('files', [...draftTask.files, { name: file.name, size: file.size }]); };
  const postComment = () => { if (!commentText.trim()) return; updateDraft('comments', [...draftTask.comments, { author: 'You', text: commentText.trim(), timestamp: new Date().toLocaleString() }]); setCommentText(''); };

  return <AppShell active="task-table" workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={onNavigate}><section className="task-detail"><input className="task-title-input" value={draftTask.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder="Task name" /><div className="detail-fields"><label>Status<select value={draftTask.status} onChange={(event) => updateDraft('status', event.target.value)}>{Object.keys(statusColors).map((status) => <option key={status}>{status}</option>)}</select></label><label>Priority<select value={draftTask.priority} onChange={(event) => updateDraft('priority', event.target.value)}>{Object.keys(priorityColors).map((priority) => <option key={priority}>{priority}</option>)}</select></label><label>Liaison<input value={draftTask.liaison} onChange={(event) => updateDraft('liaison', event.target.value)} /></label><label>Due date<input className="mono" type="date" value={draftTask.dueDate} onChange={(event) => updateDraft('dueDate', event.target.value)} /></label></div><label>Purpose<textarea rows="5" value={draftTask.purpose} onChange={(event) => updateDraft('purpose', event.target.value)} /></label><label>Timeline notes<textarea rows="5" value={draftTask.timelineNotes} onChange={(event) => updateDraft('timelineNotes', event.target.value)} /></label><section><h2>Collaborators</h2><div className="inline-action"><input value={collaboratorName} onChange={(event) => setCollaboratorName(event.target.value)} placeholder="Type a name" /><button className="btn outline" type="button" onClick={addCollaborator}>Add</button></div><div className="chips">{draftTask.collaborators.map((name) => <span key={name}><i>{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</i>{name}</span>)}</div></section><section><h2>Files</h2><input ref={fileInputRef} type="file" hidden onChange={(event) => attachFile(event.target.files?.[0])} /><button className="btn outline" type="button" onClick={() => fileInputRef.current?.click()}>Attach file</button>{draftTask.files.map((file) => <p className="file-row" key={`${file.name}-${file.size}`}>{file.name}<span>{fileSize(file.size)}</span></p>)}</section><section><h2>Comments</h2><div className="comments">{draftTask.comments.map((comment) => <article key={`${comment.timestamp}-${comment.text}`}><strong>{comment.author}</strong><span className="mono">{comment.timestamp}</span><p>{comment.text}</p></article>)}</div><div className="inline-action"><input value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Post a comment" /><button className="btn outline" type="button" onClick={postComment}>Post</button></div></section></section><div className="fixed-actions"><button className="btn ghost" type="button" onClick={onCancel}>Cancel</button><button className="btn primary" type="button" onClick={onSave}>Save Task</button></div></AppShell>;
}

function App() {
  const [page, setPage] = useState('landing');
  const [floorData, setFloorData] = useState(null);
  const [workspaceInfo, setWorkspaceInfo] = useState(initialWorkspaceInfo);
  const [tasks, setTasks] = useState(starterTasks);
  const [draftTask, setDraftTask] = useState(null);

  const navigate = (target) => {
    if (target === 'dashboard' || target === 'analysis') setPage('dashboard');
    if (target === 'task-table') setPage('task-table');
  };

  const createDraftTask = () => {
    setDraftTask({ id: `task-${Date.now()}`, name: '', liaison: '', priority: 'Medium', dueDate: '', createdAt: new Date().toISOString().slice(0, 10), status: 'Not Started', purpose: '', timelineNotes: '', collaborators: [], files: [], comments: [] });
    setPage('task-detail');
  };

  const saveDraftTask = () => {
    setTasks((current) => [...current, { ...draftTask, name: draftTask.name || 'Untitled task' }]);
    setDraftTask(null);
    setPage('task-table');
  };

  if (page === 'workspace-info') return <WorkspaceInfoPage workspaceInfo={workspaceInfo} setWorkspaceInfo={setWorkspaceInfo} onBack={() => setPage('landing')} onContinue={() => setPage('upload')} />;
  if (page === 'upload') return <UploadPage onBack={() => setPage('workspace-info')} onContinue={(nextFloorData) => { setFloorData({ ...nextFloorData, isPdf: nextFloorData.file?.type === 'application/pdf' || nextFloorData.file?.name.toLowerCase().endsWith('.pdf') }); setPage('dashboard'); }} />;
  if (page === 'dashboard') return <DashboardPage floorData={floorData} workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={navigate} />;
  if (page === 'task-table') return <TaskTablePage workspaceInfo={workspaceInfo} tasks={tasks} onNavigate={navigate} onAdd={createDraftTask} />;
  if (page === 'task-detail' && draftTask) return <TaskDetailPage workspaceInfo={workspaceInfo} tasks={tasks} draftTask={draftTask} setDraftTask={setDraftTask} onNavigate={navigate} onCancel={() => { setDraftTask(null); setPage('task-table'); }} onSave={saveDraftTask} />;
  return <LandingPage onGetStarted={() => setPage('workspace-info')} />;
}

export default App;
