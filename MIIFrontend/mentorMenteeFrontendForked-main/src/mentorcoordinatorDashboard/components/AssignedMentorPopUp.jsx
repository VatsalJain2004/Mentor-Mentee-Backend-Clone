import React, { useState } from 'react';

const AssignMentorPopup = ({ isOpen, onClose, onAssign }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  
  // Sample mentor data - in a real app this would come from an API
  const mentors = [
    { id: 1, name: 'xyz', mentorId: 'XXXXXXXX' },
    { id: 2, name: 'xyz', mentorId: 'XXXXXXXX' },
    { id: 3, name: 'xyz', mentorId: 'XXXXXXXX' },
    { id: 4, name: 'xyz', mentorId: 'XXXXXXXX' }
  ];
  
  const filteredMentors = searchQuery ? 
    mentors.filter(mentor => 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mentor.mentorId.toLowerCase().includes(searchQuery.toLowerCase())
    ) : 
    mentors;
    
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already reactive through the filteredMentors variable
  };
  
  const handleAssign = () => {
    if (selectedMentor) {
      onAssign(selectedMentor);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Assign New Mentor</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search mentor"
                className="w-full p-2 pl-8 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-2 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <button 
              type="submit" 
              className="bg-red-700 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </form>
          
          <div className="max-h-64 overflow-y-auto">
            {filteredMentors.length > 0 ? (
              filteredMentors.map(mentor => (
                <div 
                  key={mentor.id} 
                  className="flex items-center justify-between p-2 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-700 text-sm">M</span>
                    </div>
                    <div>
                      <p className="font-medium">Name: {mentor.name}</p>
                      <p className="text-sm text-gray-500">Mentor ID: {mentor.mentorId}</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={selectedMentor?.id === mentor.id}
                    onChange={() => setSelectedMentor(mentor)}
                    className="w-5 h-5"
                  />
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-gray-500">No mentors found</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleAssign}
            disabled={!selectedMentor}
            className={`px-4 py-2 rounded ${
              selectedMentor 
                ? 'bg-red-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            + Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignMentorPopup;