import React from 'react';
import { useParams } from 'react-router-dom';

const TemplateDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Template Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Template ID: {id}</p>
        {/* Template detail content will be added later */}
      </div>
    </div>
  );
};

export default TemplateDetailPage;