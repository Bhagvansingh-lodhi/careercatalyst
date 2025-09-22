import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  const buttonVariants = {
    initial: { 
      background: "linear-gradient(to right, #3b82f6, #8b5cf6)" 
    },
    hover: { 
      background: "linear-gradient(to right, #2563eb, #7c3aed)",
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    },
    tap: { 
      scale: 0.95 
    }
  };
  
  const inputVariants = {
    focus: {
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
      transition: {
        duration: 0.2
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with:", email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand section */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="flex items-center mb-6">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Career Catalyst
              </motion.h3>
            </div>
            <motion.p 
              className="text-gray-400 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Accelerate your career growth with personalized learning paths and industry insights.
            </motion.p>
            <div className="flex space-x-5">
              {['twitter', 'linkedin-in', 'instagram', 'github'].map((platform, index) => (
                <motion.a 
                  key={platform}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 bg-gray-800 p-3 rounded-full"
                  variants={iconVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <i className={`fab fa-${platform} text-lg`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {['Career Paths', 'Skill Assessment', 'Mentorship', 'Job Board', 'Resources'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-blue-500 rounded-full mr-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    ></motion.span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Resources
            </motion.h4>
            <ul className="space-y-3">
              {['Blog', 'Webinars', 'E-books', 'Case Studies', 'Community'].map((resource) => (
                <motion.li 
                  key={resource}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <motion.span 
                      className="w-2 h-2 bg-purple-500 rounded-full mr-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    ></motion.span>
                    {resource}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-5 border-b border-gray-700 pb-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Stay Updated
            </motion.h4>
            <motion.p 
              className="text-gray-400 mb-5 leading-relaxed"
              variants={itemVariants}
            >
              Subscribe to our newsletter for the latest career insights and tips.
            </motion.p>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <motion.input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white px-4 py-3 rounded-l-lg focus:outline-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <motion.button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-r-lg transition-all duration-300 flex-shrink-0"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
            <motion.div 
              className="mt-7 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="bg-gray-800 p-2 rounded-lg mr-3"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  duration: 3
                }}
              >
                <i className="fas fa-award text-blue-400 text-xl"></i>
              </motion.div>
              <p className="text-sm text-gray-400">Trusted by <span className="text-white font-medium">50,000+</span> professionals</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom footer */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <motion.p 
            className="text-gray-500 text-sm mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
          </motion.p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
              <motion.a 
                key={policy}
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
                whileHover={{ 
                  scale: 1.1,
                  color: "#60a5fa"
                }}
              >
                {policy}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;