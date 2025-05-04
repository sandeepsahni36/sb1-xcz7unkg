import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Search, Filter, Bed, Bath, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Filters {
  type: string;
  bedrooms: string;
  bathrooms: string;
}

function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    bedrooms: 'all',
    bathrooms: 'all'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-lg text-gray-500">
            Manage your property portfolio
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
            Add Property
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
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="all">Any</option>
                  <option value="studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="all">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <Building2 className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No properties</h3>
          <p className="mt-2 text-base text-gray-500">
            {searchTerm || filters.type !== 'all' || filters.bedrooms !== 'all' || filters.bathrooms !== 'all'
              ? "Try adjusting your search or filters to find what you're looking for."
              : 'Get started by creating a new property.'}
          </p>
          <div className="mt-6">
            <Button
              leftIcon={<Plus size={20} />}
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;