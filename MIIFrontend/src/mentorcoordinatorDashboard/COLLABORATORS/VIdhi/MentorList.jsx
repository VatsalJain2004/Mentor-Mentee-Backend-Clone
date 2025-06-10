import { useEffect, useState } from "react";
import { Search, Trash2, Minus, Plus } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [menteeSearch, setMenteeSearch] = useState("");
  const [unassignedMentees, setUnassignedMentees] = useState([]);
  const [selectedMenteeIds, setSelectedMenteeIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const API_BASE = "http://localhost:3000/api/mentorCoordinator";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGUiOiJtZW50b3JDb29yZGluYXRvciIsImlhdCI6MTc0NDA5MzMwMywiZXhwIjoxNzQ0MDk2OTAzfQ.1rglcjW_dxdKkVylrDKnYREmsle0nZ_8dyueOcZdMa4";

  const fetchMentors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mentors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const mentorList = Array.isArray(res.data.mentorsWithMentees)
        ? res.data.mentorsWithMentees
        : [];
      setMentors(mentorList);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const fetchAvailableMentees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mentees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Raw response data for unassigned mentees:", res.data);
  
      // Modified to use res.data directly if it's an array
      const mentees = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.unassignedMentees) ? res.data.unassignedMentees : []);
  
      console.log("Filtered unassigned mentees list:", mentees);
  
      setUnassignedMentees(mentees);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    }
  };

  const deleteMentor = async (id) => {
    try {
      await axios.delete(`${API_BASE}/mentors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  const assignMentees = async () => {
    try {
      await axios.put(
        `${API_BASE}/assign/mentees`,
        { 
          employeeid: selectedMentorId, // Add this
          mentees: selectedMenteeIds,   // Change from menteeIds to mentees
          mentorDepartment: "Default"   // Add this or get it from your data
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      closePopup();
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error assigning mentees:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchAvailableMentees();
  }, [refresh]);

  const toggleMentor = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMentors = mentors.filter((mentor) =>
    (mentor?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPopup = async (mentorId) => {
    setSelectedMentorId(mentorId);
    await fetchAvailableMentees();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMentorId(null);
    setSelectedMenteeIds([]);
    setMenteeSearch("");
    setUnassignedMentees([]);
  };

  const toggleMenteeSelection = (id) => {
    setSelectedMenteeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredMentees =
    (unassignedMentees || []).filter(
      (mentee) =>
        typeof mentee.name === "string" &&
        mentee.name.toLowerCase().includes(menteeSearch.toLowerCase())
    );

  return (
    <div className="p-10">
      <h3 className="text-2xl font-bold mb-6">MENTOR LIST</h3>

      <div className="flex mb-6">
        <div className="flex bg-red-700 text-white rounded-md px-4 py-2 w-1/2">
          <Search size={25} />
          <input
            type="text"
            placeholder="Search mentor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-red-700 border-none w-full ml-2 text-white text-lg"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredMentors.length === 0 ? (
          <p>No mentors found.</p>
        ) : (
          filteredMentors.map((mentor) => (
            <div key={mentor.id} className="border rounded shadow">
              <div className="bg-gray-300 flex justify-between p-4 items-center">
                <div>
                  <p className="font-bold">Name: {mentor.name}</p>
                  <p>Mentor ID: {mentor.mentorId}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => deleteMentor(mentor.id)}>
                    <Trash2 size={25} />
                  </button>
                  <button onClick={() => toggleMentor(mentor.id)}>
                    {expanded[mentor.id] ? <Minus size={25} /> : <Plus size={25} />}
                  </button>
                </div>
              </div>

              {expanded[mentor.id] && (
                <div className="bg-red-700 text-white p-4">
                  {Array.isArray(mentor.scholars) && mentor.scholars.length > 0 ? (
                    mentor.scholars.map((scholar) => (
                      <div
                        key={scholar.scholarId}
                        className="bg-white text-red-700 flex justify-between items-center p-3 mb-2 rounded"
                      >
                        <div className="flex items-center gap-4">
                          <FaUserCircle size={40} />
                          <div>
                            <p className="font-bold">Name: {scholar.name}</p>
                            <p>Scholar ID: {scholar.scholarId}</p>
                          </div>
                        </div>
                        <Trash2 size={25} />
                      </div>
                    ))
                  ) : (
                    <p className="text-white italic">No scholars assigned.</p>
                  )}
                  <button
                    className="mt-4 border px-4 py-2 rounded bg-white text-red-700 font-bold"
                    onClick={() => openPopup(mentor.id)}
                  >
                    + Add
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] rounded-lg overflow-hidden">
            <div className="bg-gray-300 px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-bold">Assign New Mentee</h2>
              <RxCross2 size={22} className="cursor-pointer" onClick={closePopup} />
            </div>

            <div className="p-4 bg-red-700 text-white max-h-[400px] overflow-y-auto">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search mentees"
                  value={menteeSearch}
                  onChange={(e) => setMenteeSearch(e.target.value)}
                  className="w-full p-2 rounded text-red-700"
                />
              </div>

              {filteredMentees.length > 0 ? (
                filteredMentees.map((mentee) => (
                  <div key={mentee.scholar_no} className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={selectedMenteeIds.includes(mentee.scholar_no)}
                      onChange={() => toggleMenteeSelection(mentee.scholar_no)}
                    />
                    <span>{mentee.name} (ID: {mentee.scholar_no})</span>
                  </div>
                ))
              ) : (
                <p className="italic">No mentees available or matched your search.</p>
              )}
            </div>

            <div className="bg-gray-300 px-4 py-3 text-right">
              <button
                onClick={assignMentees}
                className="bg-red-700 text-white px-4 py-2 rounded"
              >
                Assign Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorList;
