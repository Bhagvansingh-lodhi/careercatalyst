// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import useUserProgress from "../hooks/useUserProgress";
import ProgressChart from "../components/ProgressChart";
import SkillRadarChart from "../components/SkillRadarChart";

const Profile = () => {
  const { userProgress } = useUserProgress();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    graduationYear: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUserData(savedUser);
  }, []);

  const solvedProblemsCount = Object.keys(userProgress.solvedProblems).length;
  const completedTestsCount = Object.keys(userProgress.completedTests).length;
  const averageScore =
    completedTestsCount > 0
      ? Math.round(
          Object.values(userProgress.completedTests).reduce((a, b) => a + b, 0) /
            completedTestsCount
        )
      : 0;

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i className="fas fa-user-graduate text-4xl"></i>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-blue-100">
                {userData.college} • {userData.branch} • {userData.graduationYear}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                  <span className="block text-2xl font-bold">{solvedProblemsCount}</span>
                  <span className="text-sm">Problems Solved</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                  <span className="block text-2xl font-bold">{completedTestsCount}</span>
                  <span className="text-sm">Tests Completed</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                  <span className="block text-2xl font-bold">{averageScore}%</span>
                  <span className="text-sm">Avg. Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8 border border-gray-200">
          <nav className="flex space-x-2 overflow-x-auto">
            {["overview", "skills", "personal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  activeTab === tab ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h2>
              <div className="h-80">
                <ProgressChart skillLevels={userProgress.skillLevels} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Assessment</h2>
              <div className="h-96">
                <SkillRadarChart skillLevels={userProgress.skillLevels} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "personal" && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>College:</strong> {userData.college}</p>
            <p><strong>Branch:</strong> {userData.branch}</p>
            <p><strong>Graduation Year:</strong> {userData.graduationYear}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
