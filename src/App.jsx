import { useState } from 'react';

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

function UploadPage() {
  return <h1>UploadPage</h1>;
}

function DashboardPage() {
  return <h1>DashboardPage</h1>;
}

function ProjectPage() {
  return <h1>ProjectPage</h1>;
}

function App() {
  const [page, setPage] = useState('landing');

  if (page === 'upload') {
    return <UploadPage />;
  }

  if (page === 'dashboard') {
    return <DashboardPage />;
  }

  if (page === 'project') {
    return <ProjectPage />;
  }

  return <LandingPage onGetStarted={() => setPage('upload')} />;
}

export default App;
