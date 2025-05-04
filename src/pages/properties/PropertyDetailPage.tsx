import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Bed, Bath, MapPin, ClipboardCheck, Camera } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Property } from '../../types';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>({
    id: '1',
    companyId: 'company1',
    name: 'Oceanview Apartment',
    address: '123 Beach Blvd, Miami, FL 33139',
    type: 'apartment',
    bedrooms: '2',
    bathrooms: '2',
    notes: 'Beachfront property with amazing views',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  });

  const [activeTab, setActiveTab] = useState<'details' | 'checklist' | 'inspections'>('details');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Property Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{property.address}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button
              variant="outline"
              leftIcon={<ClipboardCheck size={16} />}
              onClick={() => setActiveTab('checklist')}
            >
              Checklist
            </Button>
            <Button
              leftIcon={<Camera size={16} />}
              onClick={() => setActiveTab('inspections')}
            >
              Start Inspection
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-700">
            <Building2 size={16} className="mr-1" />
            <span className="text-sm capitalize">{property.type}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bed size={16} className="mr-1" />
            <span className="text-sm">
              {property.bedrooms === 'studio' ? 'Studio' : `${property.bedrooms} Bed`}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath size={16} className="mr-1" />
            <span className="text-sm">{property.bathrooms} Bath</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'checklist'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              Checklist
            </button>
            <button
              onClick={() => setActiveTab('inspections')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'inspections'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              Inspections
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Property Details</h3>
                <div className="mt-2 text-sm text-gray-500">{property.notes}</div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Property Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">{property.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Added On</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(property.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Property Checklist</h3>
              <p className="mt-2 text-sm text-gray-500">
                Create and manage inspection checklists for this property.
              </p>
              {/* Checklist content will go here */}
            </div>
          )}

          {activeTab === 'inspections' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Inspection History</h3>
              <p className="mt-2 text-sm text-gray-500">
                View past inspections or start a new inspection.
              </p>
              {/* Inspections content will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;