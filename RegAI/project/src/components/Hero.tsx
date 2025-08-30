import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Globe, Zap, LogOut, Settings, HelpCircle, LayoutDashboard, Home, Bolt, MessageCircle, Search } from 'lucide-react';
import { initializeApp, FirebaseApp, FirebaseError } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, Auth } from 'firebase/auth';

interface Message {
  text: string;
  type: 'success' | 'error' | 'info';
}

interface HeroSectionProps {
  onNavigate: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            <span>Hackathon Project 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            AI-Powered
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Regenerative Agriculture
            </span>
            <span className="block">Advisor</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering small-scale farmers in Kenya with personalized, data-driven plans
            to transition to regenerative agriculture and fight climate change.
          </p>
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
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};

interface SignupFormProps {
  onNavigateToHero: () => void;
  onAuthComplete: () => void;
  auth: Auth | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onNavigateToHero, onAuthComplete, auth }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoginView, setIsLoginView] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = (text: string, type: 'success' | 'error' | 'info'): void => {
    setMessage({ text, type });
  };

  const handleAuthAction = async (action: 'register' | 'login'): Promise<void> => {
    try {
      if (!auth) {
        showMessage('Authentication service is not available. Please try again.', 'error');
        return;
      }
      if (action === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        showMessage('Registration successful! Redirecting...', 'success');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage('Sign-in successful! Redirecting...', 'success');
      }
      onAuthComplete();
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Authentication</h1>
        <p className="text-center text-gray-600">
          Register or sign in to your account.
        </p>
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
              onClick={onNavigateToHero}
              className="w-full bg-gray-400 text-white font-bold py-3 rounded-xl hover:bg-gray-500 transition transform hover:scale-105 shadow-md"
            >
              Back to Hero Page
            </button>
          </div>
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

interface DashboardProps {
  onLogout: () => void;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, user }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col justify-between rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">ADStudio</h1>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MAIN MENU</h3>
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <Home className="w-5 h-5 mr-3" />
              Home
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <Bolt className="w-5 h-5 mr-3" />
              RegAI
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 mr-3" />
              Chat Bot
            </a>
          </nav>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-8">PREFERENCES</h3>
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <HelpCircle className="w-5 h-5 mr-3" />
              Help Center
            </a>
          </nav>
        </div>
        <div className="mt-8">
            <button
                onClick={onLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-100"
            >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hello {user.email?.split('@')[0] || 'User'} 👋</h2>
              <p className="text-gray-600">Let's check your stats today!</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Sessions</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">2.4k+</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Visitors</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">1.6k+</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-red-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-red-400 to-red-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Views by Browser</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">44%</div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">22%</div>
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">18%</div>
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">16%</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Explorer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Safari</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                  <span>Chrome</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span>Firefox</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Time Spent</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">8.49</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">AVG Requests Received</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">4.4</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Sessions Top</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-sm">Chrome</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                  <span className="text-sm">Firefox</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm">Safari</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-600">Sessions Overview</h3>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">312</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                  <div className="text-xs text-gray-500 mt-1">31 March, 2022</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Online Visitors</span>
                  <span className="text-sm font-semibold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Page Views</span>
                  <span className="text-sm font-semibold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="text-sm font-semibold text-red-600">23%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'hero' | 'signup' | 'dashboard'>('hero');
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
      const app: FirebaseApp = initializeApp(firebaseConfig);
      const firebaseAuth: Auth = getAuth(app);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          setCurrentPage('dashboard');
        } else {
          setCurrentPage('hero');
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      setLoading(false);
    }
  }, []);

  const navigateToSignup = useCallback(() => setCurrentPage('signup'), []);
  const navigateToHero = useCallback(() => setCurrentPage('hero'), []);

  const handleSignOut = async () => {
    if (auth) {
      try {
        await signOut(auth);
        setCurrentPage('hero');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  return (
    <div>
      {currentPage === 'hero' && <HeroSection onNavigate={navigateToSignup} />}
      {currentPage === 'signup' && <SignupForm onNavigateToHero={navigateToHero} onAuthComplete={() => setCurrentPage('dashboard')} auth={auth} />}
      {currentPage === 'dashboard' && user && <Dashboard onLogout={handleSignOut} user={user} />}
    </div>
  );
};

export default App;
