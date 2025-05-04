import React, { useState } from 'react';
import { LayoutTemplate, Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';

function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="mt-1 text-lg text-gray-500">
            Manage your inspection templates
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<Filter size={20} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            leftIcon={<Plus size={20} />}
          >
            Create Template
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Type
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Types</option>
                <option value="bedroom">Bedroom</option>
                <option value="bathroom">Bathroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="living">Living Room</option>
                <option value="outdoor">Outdoor</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <LayoutTemplate className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No templates</h3>
          <p className="mt-2 text-base text-gray-500">
            {searchTerm || filter !== 'all'
              ? "Try adjusting your search or filters to find what you're looking for."
              : 'Get started by creating a new template.'}
          </p>
          <div className="mt-6">
            <Button
              leftIcon={<Plus size={20} />}
            >
              Create Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;