import { useEffect, useRef, useState } from 'react';


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

const features = [
  {
    title: 'Room Detection',
    description: 'Detect rooms, hallways, offices, and shared areas from uploaded floor plans.'
  },
  {
    title: 'Asset Planning',
    description: 'Plan desks, equipment, departments, and support spaces before move day.'
  },
  {
    title: 'Wayfinding Maps',
    description: 'Create clearer navigation routes for employees, visitors, and relocation teams.'
  },
  {
    title: 'Project Tracking',
    description: 'Manage relocation tasks, owners, statuses, and readiness milestones in one place.'
  }
];

function Logo() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontWeight: 900 }}>
      <span
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, var(--blue), var(--purple))',
          borderRadius: '14px',
          boxShadow: '0 0 28px rgba(47, 128, 255, 0.38)',
          color: 'white',
          display: 'inline-flex',
          height: '42px',
          justifyContent: 'center',
          width: '42px'
        }}
      >
        S
      </span>
      <span style={{ color: 'inherit', fontSize: '1.08rem', letterSpacing: '-0.03em' }}>SpaceIQ</span>
    </div>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <main style={{ background: 'white', color: 'var(--ink)', minHeight: '100vh' }}>
      <nav
        style={{
          alignItems: 'center',
          backdropFilter: 'blur(18px)',
          background: 'rgba(255, 255, 255, 0.86)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          gap: '24px',
          justifyContent: 'space-between',
          padding: '14px clamp(18px, 4vw, 64px)',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}
      >
        <Logo />
        <div style={{ alignItems: 'center', display: 'flex', gap: '26px', color: 'var(--muted)', fontWeight: 750 }}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
        </div>
        <button
          type="button"
          onClick={onGetStarted}
          style={{
            background: 'linear-gradient(135deg, var(--blue), var(--purple))',
            border: 0,
            borderRadius: '999px',
            boxShadow: '0 16px 34px rgba(47, 128, 255, 0.26)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 850,
            minHeight: '46px',
            padding: '0 20px'
          }}
        >
          Get Started
        </button>
      </nav>

      <section
        style={{
          background:
            'radial-gradient(circle at 78% 18%, rgba(139, 92, 246, 0.36), transparent 30%), radial-gradient(circle at 16% 22%, rgba(47, 128, 255, 0.36), transparent 28%), linear-gradient(135deg, #050812 0%, var(--ink) 52%, #101d3a 100%)',
          color: 'white',
          overflow: 'hidden',
          padding: 'clamp(78px, 11vw, 150px) clamp(18px, 4vw, 64px)',
          position: 'relative'
        }}
      >
        <div style={{ margin: '0 auto', maxWidth: '1120px' }}>
          <p style={{ color: 'var(--electric)', fontWeight: 900, letterSpacing: '0.18em', margin: '0 0 18px', textTransform: 'uppercase' }}>
            Modern workplace intelligence
          </p>
          <h1 style={{ fontSize: 'clamp(3.25rem, 8vw, 7rem)', letterSpacing: '-0.075em', lineHeight: 0.92, margin: 0, maxWidth: '900px' }}>
            Turn floor plans into intelligent workplaces.
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.76)', fontSize: 'clamp(1.08rem, 2vw, 1.35rem)', lineHeight: 1.75, margin: '28px 0 0', maxWidth: '720px' }}>
            Upload a floor plan, detect rooms with AI, plan office assets, generate wayfinding maps, and manage relocations with confidence.
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, #ffffff, #b9edff 42%, #8fb5ff)',
              border: 0,
              borderRadius: '999px',
              boxShadow: '0 18px 44px rgba(94, 231, 255, 0.25)',
              color: '#03101f',
              cursor: 'pointer',
              fontWeight: 900,
              marginTop: '34px',
              minHeight: '54px',
              padding: '0 26px'
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      <section id="features" style={{ margin: '0 auto', maxWidth: '1180px', padding: '92px clamp(18px, 4vw, 32px)' }}>
        <p style={{ color: 'var(--blue)', fontWeight: 900, letterSpacing: '0.16em', margin: '0 0 14px', textTransform: 'uppercase' }}>Features</p>
        <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', letterSpacing: '-0.06em', lineHeight: 1, margin: '0 0 34px' }}>
          Everything you need to plan smarter workplaces
        </h2>
        <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {features.map((feature) => (
            <article
              key={feature.title}
              style={{
                background: 'white',
                border: '1px solid var(--line)',
                borderRadius: '28px',
                boxShadow: '0 22px 56px rgba(15, 36, 70, 0.08)',
                minHeight: '220px',
                padding: '26px'
              }}
            >
              <div style={{ background: 'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius: '18px', color: 'white', display: 'grid', height: '52px', placeItems: 'center', width: '52px' }}>✦</div>
              <h3 style={{ fontSize: '1.25rem', letterSpacing: '-0.035em', margin: '24px 0 10px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" style={{ background: 'var(--soft)', borderTop: '1px solid var(--line)', padding: '76px clamp(18px, 4vw, 64px)', textAlign: 'center' }}>
        <p style={{ color: 'var(--blue)', fontWeight: 900, letterSpacing: '0.16em', margin: '0 0 14px', textTransform: 'uppercase' }}>About</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.055em', lineHeight: 1, margin: '0 auto', maxWidth: '760px' }}>
          SpaceIQ helps teams convert static plans into shared workplace decisions.
        </h2>
      </section>

      <section
        id="pricing"
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #07101f, #10234b)',
          borderRadius: '34px',
          color: 'white',
          display: 'flex',
          gap: '24px',
          justifyContent: 'space-between',
          margin: '92px auto',
          maxWidth: '1120px',
          padding: 'clamp(30px, 5vw, 54px)'
        }}
      >
        <div>
          <p style={{ color: 'var(--electric)', fontWeight: 900, letterSpacing: '0.16em', margin: '0 0 12px', textTransform: 'uppercase' }}>Pricing</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', letterSpacing: '-0.055em', lineHeight: 1, margin: 0 }}>
            Start with one floor. Scale across every workplace.
          </h2>
        </div>
        <button type="button" onClick={onGetStarted} style={{ background: 'white', border: 0, borderRadius: '999px', color: 'var(--ink)', cursor: 'pointer', fontWeight: 900, minHeight: '52px', padding: '0 24px' }}>
          Get Started
        </button>
      </section>

      <footer style={{ alignItems: 'center', borderTop: '1px solid var(--line)', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', padding: '30px clamp(18px, 4vw, 64px)' }}>
        <Logo />
        <span>© 2026 SpaceIQ. All rights reserved.</span>
      </footer>
    </main>
  );
}

function UploadPage({ onBack, onContinue }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysisImageBase64, setAnalysisImageBase64] = useState('');
  const [analysisMediaType, setAnalysisMediaType] = useState('image/png');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    let objectUrl = '';

    const preparePreview = async () => {
      setPreviewUrl('');
      setAnalysisImageBase64('');
      setAnalysisMediaType('image/png');

      if (!file) return;

      const fileIsPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (file.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(file);
        const base64Image = await readFileAsBase64(file);

        if (!isCancelled) {
          setPreviewUrl(objectUrl);
          setAnalysisImageBase64(base64Image);
          setAnalysisMediaType(file.type || 'image/png');
        }
        return;
      }

      if (fileIsPdf) {
        try {
          const pdfjsLib = await loadPdfJs();
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

          const pdfData = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          const dataUrl = canvas.toDataURL('image/png');
          const base64Png = dataUrl.split(',')[1];

          if (!isCancelled) {
            setPreviewUrl(dataUrl);
            setAnalysisImageBase64(base64Png);
            setAnalysisMediaType('image/png');
          }
        } catch (pdfError) {
          if (!isCancelled) {
            setError(pdfError.message || 'Unable to render the first PDF page.');
          }
        }
      }
    };

    preparePreview();

    return () => {
      isCancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleFile = (nextFile) => {
    if (!nextFile) return;

    if (!/\.(pdf|png|jpe?g)$/i.test(nextFile.name)) {
      setError('Please upload a PDF, PNG, JPG, or JPEG file.');
      return;
    }

    setFile(nextFile);
    setAnalysisResult(null);
    setError('');
  };

  const readFileAsBase64 = (targetFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(targetFile);
  });

  const parseClaudeJson = (text) => {
    const trimmed = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
    return JSON.parse(trimmed);
  };

  const analyzeFloorPlan = async () => {
    if (!file) return;

    if (!analysisImageBase64) {
      setError('Preparing floor plan preview. Please try again in a moment.');
      return;
    }

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      setError('Missing VITE_ANTHROPIC_API_KEY. Add an Anthropic API key to run live AI analysis.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const base64Image = analysisImageBase64;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: analysisMediaType,
                    data: base64Image
                  }
                },
                {
                  type: 'text',
                  text: 'Analyze this floor plan image. Return only a JSON object with these fields: confidence (high, medium, or low), confidence_note (string), rooms (array of objects with id, label, type, color, notes), and summary (string). Do not include markdown or commentary.'
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API request failed with status ${response.status}.`);
      }

      const payload = await response.json();
      const text = payload.content?.find((block) => block.type === 'text')?.text || '';
      const parsed = parseClaudeJson(text);
      setAnalysisResult({
        confidence: parsed.confidence || 'medium',
        confidence_note: parsed.confidence_note || '',
        rooms: Array.isArray(parsed.rooms) ? parsed.rooms : [],
        summary: parsed.summary || ''
      });
    } catch (nextError) {
      setError(nextError.message || 'Unable to analyze the floor plan.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateRoom = (roomId, field, value) => {
    setAnalysisResult((current) => ({
      ...current,
      rooms: current.rooms.map((room) => (room.id === roomId ? { ...room, [field]: value } : room))
    }));
  };

  const deleteRoom = (roomId) => {
    setAnalysisResult((current) => ({
      ...current,
      rooms: current.rooms.filter((room) => room.id !== roomId)
    }));
  };

  const addRoom = () => {
    const nextRoom = {
      id: `space-${Date.now()}`,
      label: 'New Space',
      type: 'Office',
      color: '#2f80ff',
      notes: 'Manually added space.'
    };

    setAnalysisResult((current) => ({
      confidence: current?.confidence || 'medium',
      confidence_note: current?.confidence_note || 'Manual edits in progress.',
      summary: current?.summary || 'Manual space planning started.',
      rooms: [...(current?.rooms || []), nextRoom]
    }));
  };

  const canContinue = file && analysisResult;

  return (
    <main style={{ background: 'var(--soft)', color: 'var(--ink)', minHeight: '100vh' }}>
      <header
        style={{
          alignItems: 'center',
          background: 'white',
          borderBottom: '1px solid var(--line)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          padding: '14px clamp(18px, 4vw, 56px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', color: 'var(--ink)', cursor: 'pointer', fontWeight: 800, justifySelf: 'start', minHeight: '42px', padding: '0 16px' }}
        >
          ← Back
        </button>
        <Logo />
        <div aria-hidden="true" />
      </header>

      <section style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 0.9fr)', margin: '0 auto', maxWidth: '1180px', padding: '46px clamp(18px, 4vw, 32px)' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files?.[0]);
          }}
          style={{
            alignItems: 'center',
            background: 'white',
            border: '1px dashed var(--blue)',
            borderRadius: '30px',
            boxShadow: '0 24px 64px rgba(15, 36, 70, 0.09)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '520px',
            padding: '34px',
            textAlign: 'center'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
            onChange={(event) => handleFile(event.target.files?.[0])}
            style={{ display: 'none' }}
          />
          <div style={{ background: 'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius: '24px', color: 'white', display: 'grid', fontSize: '2rem', fontWeight: 900, height: '76px', placeItems: 'center', width: '76px' }}>↑</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.06em', lineHeight: 1, margin: '24px 0 12px' }}>Upload a floor plan</h1>
          <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0, maxWidth: '520px' }}>Drag and drop or click to upload a PDF, PNG, JPG, or JPEG file for live Anthropic-powered floor plan analysis.</p>
          <button type="button" style={{ background: 'var(--ink)', border: 0, borderRadius: '999px', color: 'white', cursor: 'pointer', fontWeight: 900, marginTop: '22px', minHeight: '48px', padding: '0 20px' }}>Choose File</button>

          {file && (
            <div style={{ marginTop: '28px', width: '100%' }}>
              <p style={{ color: 'var(--muted)', fontWeight: 800, margin: '0 0 12px' }}>Selected file: {file.name}</p>
              {previewUrl ? (
                <img src={previewUrl} alt={`Preview of ${file.name}`} style={{ border: '1px solid var(--line)', borderRadius: '22px', maxHeight: '260px', maxWidth: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '22px', padding: '28px' }}>
                  <strong>PDF</strong>
                  <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>{file.name}</p>
                </div>
              )}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  analyzeFloorPlan();
                }}
                disabled={isAnalyzing}
                style={{ background: 'linear-gradient(135deg, var(--blue), var(--purple))', border: 0, borderRadius: '999px', color: 'white', cursor: isAnalyzing ? 'wait' : 'pointer', fontWeight: 900, marginTop: '18px', minHeight: '50px', padding: '0 22px' }}
              >
                {isAnalyzing ? 'Analyzing with Claude...' : 'Analyze Floor Plan with AI'}
              </button>
            </div>
          )}
          {error && <p style={{ color: '#b42318', fontWeight: 800, marginTop: '18px' }}>{error}</p>}
        </div>

        <aside style={{ background: 'white', border: '1px solid var(--line)', borderRadius: '30px', boxShadow: '0 24px 64px rgba(15, 36, 70, 0.09)', padding: '26px' }}>
          <p style={{ color: 'var(--blue)', fontWeight: 900, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>AI Analysis Results</p>
          {!analysisResult ? (
            <div style={{ alignItems: 'center', color: 'var(--muted)', display: 'flex', minHeight: '420px', textAlign: 'center' }}>
              <p style={{ lineHeight: 1.65, margin: '0 auto', maxWidth: '360px' }}>Upload an image floor plan and run analysis to edit detected rooms here.</p>
            </div>
          ) : (
            <div>
              <h2 style={{ letterSpacing: '-0.05em', margin: '14px 0 8px' }}>Detected rooms</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 14px' }}><strong>Confidence:</strong> {analysisResult.confidence} — {analysisResult.confidence_note}</p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{analysisResult.summary}</p>
              <div style={{ display: 'grid', gap: '12px', marginTop: '18px' }}>
                {analysisResult.rooms.map((room) => (
                  <article key={room.id} style={{ border: '1px solid var(--line)', borderRadius: '18px', padding: '14px' }}>
                    <input value={room.label} onChange={(event) => updateRoom(room.id, 'label', event.target.value)} style={{ border: '1px solid var(--line)', borderRadius: '12px', fontWeight: 800, padding: '10px', width: '100%' }} />
                    <select value={room.type} onChange={(event) => updateRoom(room.id, 'type', event.target.value)} style={{ border: '1px solid var(--line)', borderRadius: '12px', marginTop: '10px', padding: '10px', width: '100%' }}>
                      {['Office', 'Conference Room', 'Hallway', 'Bathroom', 'Open Workspace', 'Storage', 'Reception', 'Other'].map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{room.notes}</p>
                    <button type="button" onClick={() => deleteRoom(room.id)} style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', color: '#b42318', cursor: 'pointer', fontWeight: 800, padding: '8px 12px' }}>Delete</button>
                  </article>
                ))}
              </div>
              <button type="button" onClick={addRoom} style={{ background: 'white', border: '1px solid var(--blue)', borderRadius: '999px', color: 'var(--blue)', cursor: 'pointer', fontWeight: 900, marginTop: '16px', minHeight: '44px', padding: '0 16px' }}>Add Space</button>
              <button type="button" disabled={!canContinue} onClick={() => onContinue({ file, previewUrl, analysisResult })} style={{ background: 'var(--ink)', border: 0, borderRadius: '999px', color: 'white', cursor: canContinue ? 'pointer' : 'not-allowed', fontWeight: 900, marginLeft: '10px', marginTop: '16px', minHeight: '44px', padding: '0 16px' }}>Continue to Dashboard</button>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function DashboardPage({ floorData, onBack, onProject }) {
  const [viewMode, setViewMode] = useState('split');
  const showFloorPlan = viewMode === 'split' || viewMode === 'floor';
  const showAnalysis = viewMode === 'split' || viewMode === 'analysis';
  const rooms = floorData?.analysisResult?.rooms || [];

  return (
    <main style={{ background: 'var(--soft)', color: 'var(--ink)', minHeight: '100vh' }}>
      <header
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #050812 0%, var(--ink) 58%, #101d3a 100%)',
          color: 'white',
          display: 'grid',
          gap: '18px',
          gridTemplateColumns: '1fr auto 1fr',
          padding: '16px clamp(18px, 4vw, 56px)'
        }}
      >
        <div style={{ justifySelf: 'start' }}>
          <Logo />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', display: 'flex', gap: '8px', padding: '6px' }}>
          {[
            ['floor', 'Floor Plan Only'],
            ['split', 'Split View'],
            ['analysis', 'Analysis Only']
          ].map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? 'linear-gradient(135deg, #ffffff, #b9edff 42%, #8fb5ff)' : 'transparent',
                border: 0,
                borderRadius: '999px',
                color: viewMode === mode ? '#03101f' : 'rgba(255,255,255,0.78)',
                cursor: 'pointer',
                fontWeight: 850,
                minHeight: '38px',
                padding: '0 14px'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifySelf: 'end' }}>
          <button type="button" onClick={onBack} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '999px', color: 'white', cursor: 'pointer', fontWeight: 850, minHeight: '42px', padding: '0 16px' }}>
            Back
          </button>
          <button type="button" onClick={onProject} style={{ background: 'linear-gradient(135deg, var(--blue), var(--purple))', border: 0, borderRadius: '999px', color: 'white', cursor: 'pointer', fontWeight: 850, minHeight: '42px', padding: '0 16px' }}>
            Project Management
          </button>
        </div>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: showFloorPlan && showAnalysis ? 'minmax(0, 1.35fr) minmax(340px, 0.65fr)' : '1fr',
          minHeight: 'calc(100vh - 74px)'
        }}
      >
        {showFloorPlan && (
          <div style={{ background: '#07101f', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', gap: '14px', justifyContent: 'space-between', padding: '14px 18px' }}>
              <strong style={{ overflowWrap: 'anywhere' }}>{floorData?.file?.name || 'Floor Plan'}</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Zoom In', 'Zoom Out', 'Fit View', '2D'].map((control) => (
                  <button key={control} type="button" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontWeight: 800, minHeight: '36px', padding: '0 12px' }}>
                    {control}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                alignItems: 'center',
                background:
                  'linear-gradient(rgba(94,231,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(94,231,255,0.055) 1px, transparent 1px), #07101f',
                backgroundSize: '34px 34px',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              {floorData?.previewUrl ? (
                <img src={floorData.previewUrl} alt={`Uploaded floor plan preview for ${floorData.file?.name || 'floor plan'}`} style={{ height: '100%', maxHeight: 'calc(100vh - 170px)', maxWidth: '100%', objectFit: 'contain' }} />
              ) : floorData?.isPdf ? (
                <div style={{ background: 'white', borderRadius: '26px', boxShadow: '0 30px 80px rgba(0,0,0,0.34)', maxWidth: '520px', padding: '34px', textAlign: 'center', width: '100%' }}>
                  <strong style={{ color: 'var(--blue)', display: 'block', fontSize: '1rem', letterSpacing: '0.18em', marginBottom: '14px' }}>PDF</strong>
                  <h2 style={{ letterSpacing: '-0.05em', margin: 0 }}>{floorData.file?.name || 'Uploaded PDF'}</h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>PDF floor plan preview placeholder.</p>
                </div>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 800 }}>No floor plan selected.</div>
              )}
            </div>
          </div>
        )}

        {showAnalysis && (
          <aside style={{ background: 'white', borderLeft: showFloorPlan ? '1px solid var(--line)' : 0, overflow: 'auto', padding: '28px' }}>
            <p style={{ color: 'var(--blue)', fontWeight: 900, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>AI Analysis</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.06em', lineHeight: 1, margin: '14px 0 10px' }}>Detected spaces</h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 18px' }}>
              <strong>Confidence:</strong> {floorData?.analysisResult?.confidence || 'N/A'}
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 24px' }}>{floorData?.analysisResult?.summary || 'No analysis summary available yet.'}</p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {rooms.length > 0 ? rooms.map((room) => (
                <article key={room.id} style={{ border: '1px solid var(--line)', borderRadius: '18px', padding: '16px' }}>
                  <h3 style={{ letterSpacing: '-0.035em', margin: '0 0 6px' }}>{room.label}</h3>
                  <p style={{ color: 'var(--muted)', fontWeight: 800, margin: 0 }}>{room.type}</p>
                </article>
              )) : (
                <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>No detected rooms to display yet.</p>
              )}
            </div>
          </aside>
        )}
      </section>
    </main>
  );
}

function ProjectPage() {
  return <h1>ProjectPage</h1>;
}

function App() {
  const [page, setPage] = useState('landing');
  const [floorData, setFloorData] = useState(null);

  if (page === 'upload') {
    return <UploadPage onBack={() => setPage('landing')} onContinue={(nextFloorData) => { setFloorData({ ...nextFloorData, isPdf: nextFloorData.file?.type === 'application/pdf' || nextFloorData.file?.name.toLowerCase().endsWith('.pdf') }); setPage('dashboard'); }} />;
  }

  if (page === 'dashboard') {
    return <DashboardPage floorData={floorData} onBack={() => setPage('upload')} onProject={() => setPage('project')} />;
  }

  if (page === 'project') {
    return <ProjectPage />;
  }

  return <LandingPage onGetStarted={() => setPage('upload')} />;
}

export default App;
