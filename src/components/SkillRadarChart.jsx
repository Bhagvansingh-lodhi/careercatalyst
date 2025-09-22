import { useEffect, useRef } from 'react';
import {
  Chart, 
  RadarController, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
Chart.register(
  RadarController, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler,
  Tooltip,
  Legend
);

const SkillRadarChart = ({ skillLevels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Prepare data for the radar chart
      const skills = Object.keys(skillLevels);
      const levels = Object.values(skillLevels);

      const data = {
        labels: skills,
        datasets: [
          {
            label: 'Skill Proficiency',
            data: levels,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 0.8)',
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
        ],
      };

      const config = {
        type: 'radar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
              pointLabels: {
                font: {
                  size: 12,
                  family: "'Inter', sans-serif",
                },
                color: '#374151',
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20,
                backdropColor: 'transparent',
                color: '#6B7280',
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  family: "'Inter', sans-serif",
                },
                color: '#374151',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#1F2937',
              bodyColor: '#374151',
              borderColor: '#E5E7EB',
              borderWidth: 1,
              titleFont: {
                family: "'Inter', sans-serif",
                size: 14,
                weight: '600',
              },
              bodyFont: {
                family: "'Inter', sans-serif",
                size: 13,
              },
              padding: 10,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            },
          },
          elements: {
            line: {
              tension: 0.2,
            },
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart',
          },
        },
      };

      // Create new chart instance
      chartInstance.current = new Chart(chartRef.current, config);
    }

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [skillLevels]);

  return (
    <div className="w-full h-96">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SkillRadarChart;