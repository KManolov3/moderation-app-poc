import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Annotations } from './pages/Annotations';
import { Review } from './pages/Review';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material/';

const theme = createTheme({
  palette: {
    background: {
      default: '#e4f0e2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Annotations />} />
          <Route path='/review' element={<Review />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
