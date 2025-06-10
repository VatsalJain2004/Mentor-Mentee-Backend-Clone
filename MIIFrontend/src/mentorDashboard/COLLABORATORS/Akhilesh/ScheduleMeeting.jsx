import { useState } from 'react';
import axios from 'axios';

const ScheduleMeeting = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        to: '',
        agenda: '',
        meetingLink: '',
    });

    const [scheduledMeetings, setScheduledMeetings] = useState([]);
    const [pastMeetings, setPastMeetings] = useState([]);

    const employeeid = '101'; // Replace this dynamically
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNSwicm9sZSI6Im1lbnRvciIsImlhdCI6MTc0MzkzNDk3OSwiZXhwIjoxNzQzOTM4NTc5fQ.qTv6DAHUw-pKJ4sFLt2cM3xLC1-gtEaGakzzRadIdGY'; // Replace this dynamically

    const formFields = [
        { id: "date", label: "Date", type: "date", colSpan: "sm:col-span-4" },
        { id: "time", label: "Time", type: "time", colSpan: "sm:col-span-4" },
        { id: "to", label: "To", type: "time", colSpan: "sm:col-span-4" },
        { id: "agenda", label: "Agenda", type: "text", placeholder: "Agenda of the Meeting", colSpan: "col-span-12" },
        { id: "meetingLink", label: "Meeting Link", type: "url", placeholder: "Provide Meeting Link", colSpan: "col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-11" },
    ];

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            date: formData.date,
            timeFrom: formData.time,
            timeTo: formData.to,
            Agenda: formData.agenda,
            MeetingLink: formData.meetingLink,
            employeeid,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/mentor/scheduleMeeting', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Meeting scheduled successfully');

                // Categorize the new meeting
                const meeting = {
                    date: formData.date,
                    time: formData.time,
                    to: formData.to,
                    agenda: formData.agenda,
                    meetingLink: formData.meetingLink,
                };

                const now = new Date();
                const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
                if (meetingDateTime > now) {
                    setScheduledMeetings(prev => [...prev, meeting]);
                } else {
                    setPastMeetings(prev => [...prev, meeting]);
                }

                // Reset form
                setFormData({
                    date: '',
                    time: '',
                    to: '',
                    agenda: '',
                    meetingLink: '',
                });
            }
        } catch (error) {
            console.error('Error scheduling meeting:', error);
            alert('Failed to schedule meeting. Please try again.');
        }
    };

    return (
        <div className="w-full h-full">
            <div className="font-[arial] p-10 sm:p-20">
                {/* Schedule Meeting Form */}
                <div className="w-full p-6 rounded-lg !shadow-black/25 !shadow-inner !bg-[#A4A4A4] !drop-shadow-lg mb-20 px-5 md:px-28">
                    <h1 className="h-fit pb-3 w-full text-center font-bold text-5xl border-b-[2.5px] border-[#A01212] text-[#A01212] mb-4">
                        Scheduling Meeting
                    </h1>

                    <form className="w-full grid grid-cols-12 gap-5" onSubmit={handleSubmit}>
                        {formFields.map(({ id, label, type, placeholder, colSpan }) => (
                            <div key={id} className={`col-span-12 ${colSpan}`}>
                                <label htmlFor={id} className="block text-xl font-medium text-black">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleInputChange}
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-black text-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder={placeholder || undefined}
                                    required
                                />
                            </div>
                        ))}

                        <div className="col-span-12 sm:col-span-4 md:col-span-3 xl:col-span-1 flex justify-center items-end">
                            <button
                                type="submit"
                                className="text-white bg-[#A01212] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-2xl px-5 py-2.5 text-center"
                            >
                                Schedule
                            </button>
                        </div>
                    </form>
                </div>

                {/* Scheduled & Past Meetings Sections */}
                {[
                    { title: "Scheduled Meetings", data: scheduledMeetings, status: "Pending" },
                    { title: "Past Meetings", data: pastMeetings, status: "Successfully Conducted" },
                ].map(({ title, data, status }) =>
                    data.length > 0 ? (
                        <div key={title} className="w-full p-6 rounded-lg !shadow-black/25 !shadow-inner !bg-[#F1F1F1] !drop-shadow-lg mb-20 px-5 md:px-28">
                            <h1 className="h-fit pb-3 w-full text-center font-bold text-5xl border-b-[2.5px] border-[#A01212] text-[#A01212] mb-4">
                                {title}
                            </h1>
                            {data.map((meeting, index) => (
                                <div key={index} className="w-full grid grid-cols-12 gap-4 bg-[#A01212] p-5 text-white rounded-2xl mb-4">
                                    {[
                                        { label: "Date", value: meeting.date, colSpan: "sm:col-span-6" },
                                        { label: "Time", value: `${meeting.time} - ${meeting.to}`, colSpan: "sm:col-span-6" },
                                        { label: "Agenda", value: meeting.agenda, colSpan: "col-span-12" },
                                        { label: "Meeting Link", value: meeting.meetingLink, colSpan: "col-span-12" },
                                        { label: "Status", value: status, colSpan: "col-span-12" },
                                    ].map(({ label, value, colSpan }, i) => (
                                        <p key={i} className={`col-span-12 ${colSpan} text-xl`}>
                                            {label}: <span className="font-bold text-2xl">{value}</span>
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default ScheduleMeeting;
