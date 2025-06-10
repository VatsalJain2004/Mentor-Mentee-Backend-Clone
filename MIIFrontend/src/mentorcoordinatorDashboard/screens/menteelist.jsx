import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import Papa from 'papaparse';
import AssignMentorPopup from '../components/AssignedMentorPopUp';

const MenteeList = () => {
  const [mentees, setMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMenteeId, setSelectedMenteeId] = useState(null);

  // Sample mentee data (you can remove this in production)
  useEffect(() => {
    const initialMentees = [
      { id: 1, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: 'xyz', mentorId: 'XXXXXXXX' },
      { id: 2, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: 'xyz', mentorId: 'XXXXXXXX' },
      { id: 3, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: 'xyz', mentorId: 'XXXXXXXX' },
      { id: 4, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: '', mentorId: '' },
      { id: 5, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: '', mentorId: '' },
      { id: 6, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: '', mentorId: '' },
      { id: 7, name: 'xyz', enrollmentNumber: 'XXXXXXXX', mentorName: '', mentorId: '' },
    ];
    setMentees(initialMentees);
    setFilteredMentees(initialMentees);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredMentees(mentees);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const results = mentees.filter(
      mentee => 
        mentee.name.toLowerCase().includes(term) || 
        mentee.enrollmentNumber.toLowerCase().includes(term)
    );
    setFilteredMentees(results);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        if (file.name.endsWith('.csv')) {
          // Handle CSV file
          Papa.parse(result, {
            header: true,
            complete: (results) => {
              processImportedData(results.data);
              setUploading(false);
            },
            error: () => {
              alert('Error parsing CSV file');
              setUploading(false);
            }
          });
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          // Handle Excel file
          const workbook = XLSX.read(result, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          processImportedData(data);
          setUploading(false);
        } else {
          alert('Please upload a CSV or Excel file');
          setUploading(false);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file');
        setUploading(false);
      }
    };

    fileReader.readAsBinaryString(file);
  };

  const processImportedData = (data) => {
    // Map imported data to our mentee structure
    const importedMentees = data.map((item, index) => ({
      id: mentees.length + index + 1,
      name: item.name || item.Name || '',
      enrollmentNumber: item.enrollmentNumber || item.EnrollmentNumber || item.enrollment_number || '',
      mentorName: item.mentorName || item.MentorName || item.mentor_name || '',
      mentorId: item.mentorId || item.MentorId || item.mentor_id || '',
    }));

    const updatedMentees = [...mentees, ...importedMentees];
    setMentees(updatedMentees);
    setFilteredMentees(updatedMentees);
  };

  const openAssignModal = (menteeId) => {
    setSelectedMenteeId(menteeId);
    setIsAssignModalOpen(true);
  };

  const handleAssignMentor = (mentor) => {
    // Update the mentee with the selected mentor
    const updatedMentees = mentees.map(mentee => {
      if (mentee.id === selectedMenteeId) {
        return {
          ...mentee,
          mentorName: mentor.name,
          mentorId: mentor.mentorId
        };
      }
      return mentee;
    });

    setMentees(updatedMentees);
    setFilteredMentees(updatedMentees.filter(
      mentee => 
        !searchTerm.trim() || 
        mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        mentee.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full p-6 bg-white">
      <h1 className="text-xl font-bold mb-6">MENTEE LIST</h1>
      
      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Enter enrollment number" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full border border-red-700 rounded-md p-2"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
        >
          Search
        </button>
        <button 
          onClick={() => document.getElementById('fileUpload').click()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Import
        </button>
        <input
          id="fileUpload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button 
          onClick={() => {
            setSearchTerm('');
            setFilteredMentees(mentees);
          }}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
        >
          Filter
        </button>
      </div>

      {/* Mentee List */}
      <div className="mb-6 rounded-md overflow-hidden shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-12 py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left flex-1">Mentee name</th>
                <th className="py-3 px-4 text-left flex-1">Mentor name</th>
                <th className="w-32 py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMentees.map((mentee, index) => (
                <tr key={mentee.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 border-t">{index + 1}.</td>
                  <td className="py-3 px-4 border-t">
                    <div>Name: {mentee.name}</div>
                    <div className="text-sm text-gray-600">Scholar ID: {mentee.enrollmentNumber}</div>
                  </td>
                  <td className="py-3 px-4 border-t">
                    {mentee.mentorName ? (
                      <>
                        <div>Name: {mentee.mentorName}</div>
                        <div className="text-sm text-gray-600">Mentor ID: {mentee.mentorId}</div>
                      </>
                    ) : (
                      <div className="text-gray-500">No mentor assigned</div>
                    )}
                  </td>
                  <td className="py-3 px-4 border-t text-right">
                    {!mentee.mentorName && (
                      <button
                        onClick={() => openAssignModal(mentee.id)}
                        className="bg-red-700 text-white text-xs px-2 py-1 rounded-md hover:bg-red-800"
                      >
                        + assign mentor
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <button 
          onClick={handlePrint}
          className="bg-white text-red-700 border border-red-700 px-6 py-2 rounded-md hover:bg-red-50"
        >
          Print
        </button>
      </div>

      {/* Assign Mentor Popup */}
      <AssignMentorPopup 
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignMentor}
      />

      {/* Loading Overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-semibold">Processing file...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeList;