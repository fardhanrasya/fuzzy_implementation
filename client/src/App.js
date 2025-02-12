import React from 'react';
import NavigationBar from './components/Navbar';
import ScholarshipForm from './components/ScholarshipForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <main className="container mt-4">
        <ScholarshipForm />
      </main>
    </div>
  );
}

export default App;