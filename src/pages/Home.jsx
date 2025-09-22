import { Link } from 'react-router-dom'
import { userData } from '../data/userData'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const rotateIn = {
  hidden: { opacity: 0, rotate: -15 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      });
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {value}+
    </motion.span>
  );
};

// Animated component with scroll trigger
const AnimatedSection = ({ children, variants, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection variants={fadeIn}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Accelerate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Career Journey</span> 🚀
            </h1>
          </AnimatedSection>
          
          <AnimatedSection variants={fadeIn} className="mb-10">
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Master the skills you need to succeed in today's competitive job market with personalized learning paths and expert mentorship.
            </p>
          </AnimatedSection>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/practice"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform shadow-lg block"
              >
                Start Learning Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/resources"
                className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-gray-700 block"
              >
                Explore Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 group relative overflow-hidden"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                <AnimatedCounter value={userData.problemsSolved} />
              </div>
              <div className="text-gray-400">Problems Solved</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 group relative overflow-hidden"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {userData.mockTestsTaken}
              </div>
              <div className="text-gray-400">Mock Tests Taken</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 group relative overflow-hidden"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {userData.averageScore}%
              </div>
              <div className="text-gray-400">Average Score</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 group relative overflow-hidden"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {userData.mentorshipSessions}
              </div>
              <div className="text-gray-400">Mentorship Sessions</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Career Catalyst?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to accelerate your career growth and land your dream job
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection variants={slideInFromLeft}>
              <motion.div 
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                  >
                    <i className="fas fa-laptop-code text-2xl text-blue-600"></i>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">Skill-Based Learning Paths</h3>
                  <p className="text-gray-600">
                    Personalized learning journeys based on your career goals and skill gaps with real-world projects.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection variants={fadeIn}>
              <motion.div 
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fas fa-chart-line text-2xl text-purple-600"></i>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">Industry-Ready Practice</h3>
                  <p className="text-gray-600">
                    Real interview questions from top companies with detailed solutions and performance analytics.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection variants={slideInFromRight}>
              <motion.div 
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <i className="fas fa-user-graduate text-2xl text-green-600"></i>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">Expert Mentorship</h3>
                  <p className="text-gray-600">
                    1:1 guidance from industry professionals who work at top tech companies and startups.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your career?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of students and professionals who have accelerated their careers with Career Catalyst
          </p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={rotateIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg block"
              >
                Create Free Account
              </Link>
            </motion.div>
            <motion.div variants={rotateIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/practice"
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 block"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-70"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-50"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-white rounded-full opacity-30"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>
    </div>
  )
}

export default Home