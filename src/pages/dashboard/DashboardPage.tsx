import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { TIER_LIMITS } from '../../types';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { company } = useAuthStore();
  
  // Sample data for demonstration purposes
  const [stats] = useState({
    properties: 8,
    completedInspections: 24,
    pendingInspections: 3,
    issuesDetected: 7,
  });
  
  // Activities data (would come from the database in a real app)
  const [activities] = useState([
    {
      id: 1,
      type: 'inspection_completed',
      property: 'Seaside Apartment 2B',
      date: '2025-04-10T14:30:00Z',
      user: 'Jane Cooper',
    },
    {
      id: 2,
      type: 'damage_detected',
      property: 'Mountain View Villa',
      date: '2025-04-09T11:15:00Z',
      user: 'Robert Fox',
      details: 'Water damage in master bathroom'
    },
    {
      id: 3,
      type: 'inspection_started',
      property: 'Downtown Loft 5A',
      date: '2025-04-09T09:45:00Z',
      user: 'Jane Cooper',
    },
    {
      id: 4,
      type: 'template_created',
      template: 'Luxury Kitchen',
      date: '2025-04-08T16:20:00Z',
      user: 'Michael Johnson',
    },
  ]);
  
  // Chart data
  const inspectionChartData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Check-in Inspections',
        data: [12, 15, 18, 14],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Check-out Inspections',
        data: [8, 10, 12, 11],
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const issueChartData = {
    labels: ['Damage', 'Missing Items', 'Cleanliness', 'Maintenance'],
    datasets: [
      {
        label: 'Issues by Type',
        data: [8, 4, 6, 2],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const tierLimits = TIER_LIMITS[company?.tier || 'starter'];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Overview of your property inspections and activities
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/properties">
            <Button
              size="sm"
              leftIcon={<Building2 size={16} />}
            >
              Manage Properties
            </Button>
          </Link>
          <Link to="/dashboard/reports">
            <Button
              variant="outline"
              size="sm"
            >
              View Reports
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Usage statistics */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Usage Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <Building2 className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Properties</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.properties} / {tierLimits.properties === Infinity ? '∞' : tierLimits.properties}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/dashboard/properties" className="font-medium text-primary-600 hover:text-primary-500">
                  View all properties
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed Inspections</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.completedInspections}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/dashboard/reports" className="font-medium text-primary-600 hover:text-primary-500">
                  View all reports
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Inspections</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.pendingInspections}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/dashboard/properties" className="font-medium text-primary-600 hover:text-primary-500">
                  Schedule inspection
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Issues Detected</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.issuesDetected}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/dashboard/reports" className="font-medium text-primary-600 hover:text-primary-500">
                  View issues
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Inspection Activity</h3>
            <Bar
              data={inspectionChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Issue Types</h3>
            <Pie
              data={issueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {activity.type === 'inspection_completed' && 'Inspection completed'}
                      {activity.type === 'damage_detected' && 'Damage detected'}
                      {activity.type === 'inspection_started' && 'Inspection started'}
                      {activity.type === 'template_created' && 'Template created'}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {activity.property && (
                          <>
                            <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {activity.property}
                          </>
                        )}
                        {activity.template && (
                          <>
                            <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {activity.template}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>by {activity.user}</p>
                    </div>
                  </div>
                  {activity.details && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Quick links */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
            <h3 className="text-base font-medium text-primary-800 mb-2">Add a New Property</h3>
            <p className="text-sm text-primary-600 mb-4">
              Create a new property and set up its inspection templates.
            </p>
            <Link to="/dashboard/properties">
              <Button size="sm">
                Add Property
              </Button>
            </Link>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
            <h3 className="text-base font-medium text-secondary-800 mb-2">Create Template</h3>
            <p className="text-sm text-secondary-600 mb-4">
              Create reusable inspection templates for different room types.
            </p>
            <Link to="/dashboard/templates">
              <Button 
                size="sm"
                className="bg-secondary-600 hover:bg-secondary-700 focus-visible:ring-secondary-500"
              >
                Create Template
              </Button>
            </Link>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-6 border border-accent-100">
            <h3 className="text-base font-medium text-accent-800 mb-2">View Reports</h3>
            <p className="text-sm text-accent-600 mb-4">
              Access all inspection reports and download as PDF.
            </p>
            <Link to="/dashboard/reports">
              <Button 
                size="sm"
                className="bg-accent-600 hover:bg-accent-700 focus-visible:ring-accent-500"
              >
                View Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;