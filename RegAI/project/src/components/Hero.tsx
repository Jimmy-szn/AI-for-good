import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Zap } from 'lucide-react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

// Define the type for the message state
interface Message {
  text: string;
  type: 'success' | 'error' | 'info';
}

const HeroSection: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            <span>Hackathon Project 2025</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            AI-Powered
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Regenerative Agriculture
            </span>
            <span className="block">Advisor</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering small-scale farmers in Kenya with personalized, data-driven plans 
            to transition to regenerative agriculture and fight climate change.
          </p>

          {/* Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span className="text-gray-600">Climate Adaptation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Carbon Sequestration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-orange-600 rounded-full"></div>
              <span className="text-gray-600">Soil Health</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <button 
              onClick={onNavigate} 
              className="group inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Explore the Solution</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};

const SignupForm: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoginView, setIsLoginView] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBR10w5x0yHHHPX65VqKZDJDxhZRrKP_Ik",
      authDomain: "rage-ai-b2c1c.firebaseapp.com",
      projectId: "rage-ai-b2c1c",
      storageBucket: "rage-ai-b2c1c.firebasestorage.app",
      messagingSenderId: "998750086948",
      appId: "1:998750086948:web:c7d3c7cec16957a14035b1",
      measurementId: "G-P6T69G1FTD"
    };

    try {
      // Initialize Firebase
      const app: FirebaseApp = initializeApp(firebaseConfig);
      const firebaseAuth: Auth = getAuth(app);
      setAuth(firebaseAuth);

      // Set up a listener for authentication state changes
      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        setUser(currentUser);
      });

      // Cleanup the listener on component unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }, []);

  const showMessage = (text: string, type: 'success' | 'error' | 'info'): void => {
    setMessage({ text, type });
  };

  const handleAuthAction = async (action: 'register' | 'login'): Promise<void> => {
    try {
      if (action === 'register') {
        if (auth) {
          await createUserWithEmailAndPassword(auth, email, password);
          showMessage('Registration successful! You are now signed in.', 'success');
        }
      } else {
        if (auth) {
          await signInWithEmailAndPassword(auth, email, password);
          showMessage('Sign-in successful! Welcome back.', 'success');
        }
      }
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof FirebaseError) {
        errorMessage = error.message.replace('Firebase: ', '');
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showMessage(`Authentication failed: ${errorMessage}`, 'error');
      console.error('Authentication error:', error);
    }
  };

  const handleLogout = (): void => {
    if (auth) {
      auth.signOut();
      showMessage('You have been signed out.', 'info');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Authentication</h1>
        <p className="text-center text-gray-600">
          {user ? 'Welcome! You are logged in.' : 'Register or sign in to your account.'}
        </p>

        {user ? (
          // Logged-in view
          <div className="space-y-4 text-center">
            <p className="text-xl font-semibold text-gray-700">Hello, {user.email}!</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-md"
            >
              Log Out
            </button>
            <button
              onClick={onNavigate}
              className="w-full bg-gray-400 text-white font-bold py-3 rounded-xl hover:bg-gray-500 transition transform hover:scale-105 shadow-md"
            >
              Back to Hero Page
            </button>
          </div>
        ) : (
          // Auth forms view
          <div className="space-y-6">
            <div className={`${!isLoginView ? '' : 'hidden'} space-y-4`}>
              <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
              <button
                onClick={() => handleAuthAction('register')}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition transform hover:scale-105 shadow-md"
              >
                Register
              </button>
              <p className="text-center text-gray-600 mt-2">
                Already have an account?{' '}
                <a href="#" onClick={() => setIsLoginView(true)} className="text-green-600 hover:text-green-800 font-medium transition">
                  Sign in here.
                </a>
              </p>
            </div>

            <div className={`${isLoginView ? '' : 'hidden'} space-y-4`}>
              <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                onClick={() => handleAuthAction('login')}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
              >
                Sign In
              </button>
              <p className="text-center text-gray-600 mt-2">
                Don't have an account?{' '}
                <a href="#" onClick={() => setIsLoginView(false)} className="text-blue-600 hover:text-blue-800 font-medium transition">
                  Register here.
                </a>
              </p>
            </div>
            <button
              onClick={onNavigate}
              className="w-full bg-gray-400 text-white font-bold py-3 rounded-xl hover:bg-gray-500 transition transform hover:scale-105 shadow-md"
            >
              Back to Hero Page
            </button>
          </div>
        )}

        {message && (
          <div
            className={`p-4 rounded-xl text-center font-medium ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'hero' | 'signup'>('hero');

  const navigateToSignup = () => setCurrentPage('signup');
  const navigateToHero = () => setCurrentPage('hero');

  return (
    <div>
      {currentPage === 'hero' ? (
        <HeroSection onNavigate={navigateToSignup} />
      ) : (
        <SignupForm onNavigate={navigateToHero} />
      )}
    </div>
  );
};

export default App;
