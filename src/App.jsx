import { useState } from 'react';

function LandingPage() {
  return <h1>LandingPage</h1>;
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
  const [page] = useState('landing');

  if (page === 'upload') {
    return <UploadPage />;
  }

  if (page === 'dashboard') {
    return <DashboardPage />;
  }

  if (page === 'project') {
    return <ProjectPage />;
  }

  return <LandingPage />;
}

export default App;
