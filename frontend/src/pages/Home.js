import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSearch, Sparkles, Target, Award, BriefcaseIcon, GraduationCap, Code, User } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount and on any localStorage changes
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    // Initial check
    checkLoginStatus();

    // Add event listener for localStorage changes
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowLogout(false);
    navigate('/');
  };

  const handleAnalyzeClick = () => {
    if (isLoggedIn) {
      navigate('/analyze');
    } else {
      toast.info('Please log in to analyze your resume', {
        position: "top-center",
        autoClose: 3000
      });
      navigate('/login');
    }
  };

  const features = [
    { 
      icon: <Target className="h-6 w-6 text-blue-600" />, 
      title: 'Job-Specific Analysis', 
      description: 'Get tailored feedback based on the job description you provide.' 
    },
    { 
      icon: <Sparkles className="h-6 w-6 text-blue-600" />, 
      title: 'AI-Powered Insights', 
      description: 'Advanced AI algorithms analyze your resume for optimal results.' 
    },
    { 
      icon: <Award className="h-6 w-6 text-blue-600" />, 
      title: 'Detailed Scoring', 
      description: 'Receive comprehensive scoring across multiple categories.' 
    },
  ];

  const sections = [
    { 
      icon: <Award className="h-6 w-6 text-blue-600" />, 
      title: 'Overall Impact', 
      description: 'Get a comprehensive overview of your resume\'s effectiveness.' 
    },
    { 
      icon: <BriefcaseIcon className="h-6 w-6 text-blue-600" />, 
      title: 'Work Experience', 
      description: 'Analyze how well your experience matches job requirements.' 
    },
    { 
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />, 
      title: 'Education', 
      description: 'Evaluate the presentation of your academic achievements.' 
    },
    { 
      icon: <Code className="h-6 w-6 text-blue-600" />, 
      title: 'Skills & Technologies', 
      description: 'Assess your technical competencies and skill relevance.' 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none"
                onClick={() => setShowLogout(!showLogout)}
              >
                <User className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </button>
              
              <div
                className={`absolute mt-12 transition-all duration-300 ease-in-out transform ${
                  showLogout
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                <button
                  className="px-4 py-6 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-6 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-medium flex items-center space-x-2 hover:bg-blue-50 transition-colors duration-200"
              >
                <span>Login</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <span>Sign Up</span>
              </motion.button>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Elevate Your Resume</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant, AI-powered feedback on your resume and increase your chances of landing your dream job.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyzeClick}
            className={`mt-8 px-8 py-4 rounded-full ${
              isLoggedIn 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
            } text-white text-lg font-medium flex items-center space-x-2 mx-auto`}
          >
            <FileSearch className="h-5 w-5" />
            <span>{isLoggedIn ? 'Analyze My Resume' : 'Login to Analyze'}</span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.2 }} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-blue-50 rounded-full p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Comprehensive Analysis Sections
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 + 0.3 }} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 rounded-full p-3">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="mt-16 text-center"
        >
          <p className="text-gray-500">
            Trusted by thousands of job seekers worldwide
          </p>
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;