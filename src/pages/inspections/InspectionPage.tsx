import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Check, X, AlertTriangle, Save, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'sonner';

type InspectionItem = {
  id: string;
  type: 'text' | 'photo' | 'checkbox';
  label: string;
  value: string | boolean | null;
  photos?: string[];
  notes?: string;
};

type Room = {
  id: string;
  name: string;
  items: InspectionItem[];
};

const InspectionPage = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [signature, setSignature] = useState<any>(null);
  const [guestName, setGuestName] = useState('');
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Living Room',
      items: [
        {
          id: '1-1',
          type: 'checkbox',
          label: 'Furniture in good condition',
          value: null,
          notes: '',
        },
        {
          id: '1-2',
          type: 'photo',
          label: 'Wall condition',
          value: null,
          photos: [],
          notes: '',
        },
        {
          id: '1-3',
          type: 'text',
          label: 'Additional notes',
          value: '',
        },
      ],
    },
    {
      id: '2',
      name: 'Kitchen',
      items: [
        {
          id: '2-1',
          type: 'checkbox',
          label: 'Appliances working',
          value: null,
          notes: '',
        },
        {
          id: '2-2',
          type: 'photo',
          label: 'Counter surfaces',
          value: null,
          photos: [],
          notes: '',
        },
      ],
    },
    {
      id: '3',
      name: 'Signature',
      items: [],
    },
  ]);

  const handlePhotoUpload = (roomId: string, itemId: string) => {
    // Simulate photo upload
    toast.info('Photo upload functionality coming soon');
  };

  const handleItemUpdate = (roomId: string, itemId: string, value: any, field: string = 'value') => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: room.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                [field]: value,
              };
            }
            return item;
          }),
        };
      }
      return room;
    }));
  };

  const handleSaveInspection = async () => {
    try {
      // In a real implementation, we would save the inspection data
      toast.success('Inspection saved successfully');
    } catch (error) {
      toast.error('Failed to save inspection');
    }
  };

  const handleCompleteInspection = async () => {
    if (!signature) {
      toast.error('Please add a signature to complete the inspection');
      return;
    }

    try {
      // In a real implementation, we would submit the inspection
      toast.success('Inspection completed successfully');
    } catch (error) {
      toast.error('Failed to complete inspection');
    }
  };

  const currentRoom = rooms[currentStep];
  const isLastStep = currentStep === rooms.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Room {currentStep + 1} of {rooms.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(((currentStep + 1) / rooms.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / rooms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Room header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{currentRoom.name}</h1>
        {currentRoom.name !== 'Signature' && (
          <p className="mt-1 text-sm text-gray-500">
            Complete all items before moving to the next room.
          </p>
        )}
      </div>

      {/* Room content */}
      <div className="space-y-6">
        {currentRoom.name === 'Signature' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Guest Name</label>
              <Input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter guest name"
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <SignatureCanvas
                  ref={(ref) => setSignature(ref)}
                  canvasProps={{
                    className: 'w-full h-64 bg-white',
                  }}
                />
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => signature?.clear()}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        ) : (
          currentRoom.items.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                  
                  {item.type === 'checkbox' && (
                    <div className="mt-4 flex items-center space-x-4">
                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                          item.value === true
                            ?'border-success-500 bg-success-50 text-success-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleItemUpdate(currentRoom.id, item.id, true)}
                      >
                        <Check size={16} />
                        <span>Pass</span>
                      </button>
                      
                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                          item.value === false
                            ? 'border-error-500 bg-error-50 text-error-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleItemUpdate(currentRoom.id, item.id, false)}
                      >
                        <X size={16} />
                        <span>Fail</span>
                      </button>
                    </div>
                  )}
                  
                  {item.type === 'photo' && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {item.photos?.map((photo, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 rounded-lg overflow-hidden"
                          >
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              className="absolute top-1 right-1 p-1 bg-error-500 text-white rounded-full hover:bg-error-600"
                              onClick={() => {
                                const newPhotos = [...(item.photos || [])];
                                newPhotos.splice(index, 1);
                                handleItemUpdate(currentRoom.id, item.id, newPhotos, 'photos');
                              }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        
                        <button
                          className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                          onClick={() => handlePhotoUpload(currentRoom.id, item.id)}
                        >
                          <Camera size={24} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {item.type === 'text' && (
                    <textarea
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      rows={3}
                      value={item.value as string}
                      onChange={(e) => handleItemUpdate(currentRoom.id, item.id, e.target.value)}
                      placeholder="Enter notes here..."
                    />
                  )}
                  
                  {(item.type === 'checkbox' || item.type === 'photo') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        rows={2}
                        value={item.notes}
                        onChange={(e) => handleItemUpdate(currentRoom.id, item.id, e.target.value, 'notes')}
                        placeholder="Add any additional notes..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Save size={16} />}
            onClick={handleSaveInspection}
          >
            Save
          </Button>
          
          {isLastStep ? (
            <Button
              leftIcon={<Send size={16} />}
              onClick={handleCompleteInspection}
              disabled={!signature}
            >
              Complete
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionPage;