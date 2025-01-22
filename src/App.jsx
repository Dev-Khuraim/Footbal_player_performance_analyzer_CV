import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy loading components
const Dashboard = lazy(() => import('./Components/dashboard/Dashboard'));
const SignIn = lazy(() => import('./Components/auth/SignIn'));
const SignUp = lazy(() => import('./Components/auth/SignUp'));
const HeroSection = lazy(() => import('./Components/HeroSection/HeroSection'));
const PrivateRoute = lazy(() => import('./Components/routes/PrivateRoute'));
const VideoDisplay = lazy(() => import('./Components/dashboard/Components/VideoDisplay/VideoDisplay'));

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HeroSection />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/displayvideo" element={<PageTransition><VideoDisplay /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <p>Loading...</p>
    </div>
  );
}

export default App;
