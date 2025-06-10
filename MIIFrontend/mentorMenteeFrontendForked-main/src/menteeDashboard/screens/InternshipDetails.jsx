"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "../../uicomponents/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../uicomponents/ui/select";

export default function InternshipRecord() {
  const [records, setRecords] = useState([
    {
      id: 1,
      companyName: "xyz",
      natureOfInternship: "Hybrid",
      startDate: "2024-02-01",
      endDate: "2024-03-18",
      isEditing: false,
    },
    {
      id: 2,
      companyName: "xyz",
      natureOfInternship: "Offline",
      startDate: "2024-08-06",
      endDate: "2024-09-26",
      isEditing: false,
    },
    {
      id: 3,
      companyName: "xyz",
      natureOfInternship: "Online",
      startDate: "2024-12-15",
      endDate: "2025-01-09",
      isEditing: false,
    },
  ]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddRecord = () => {
    const newId = records.length + 1;
    setRecords([
      ...records,
      {
        id: newId,
        companyName: "",
        natureOfInternship: "Hybrid",
        startDate: "",
        endDate: "",
        isEditing: true,
      },
    ]);
  };

  const handleUpdateRecord = (id, field, value) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const toggleEdit = (id) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, isEditing: !record.isEditing } : record
      )
    );
  };

  return (
    // maximum number of internships added should be <=8 bcoz of overflow hidden
    <div className="h-full w-full px-14 lg:px-80 py-11 lg:overflow-hidden">
      <div className="uppercase text-5xl font-semibold mb-8">
        Internship Details
      </div>
      <div className="bg-[#F3F3F3] py-12 px-12 md:px-16 flex gap-12 h-full pb-0">
        <div className="p-4 place-self-start w-full flex-grow">
          <div className="bg-gray-200 rounded-t-lg">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full px-6 py-3 flex justify-between items-center"
            >
              <h2 className="text-3xl font-medium">Record</h2>
              {isCollapsed ? (
                <Plus className="h-5 w-5 scale-150" />
              ) : (
                <Minus className="h-5 w-5 scale-150" />
              )}
            </button>
          </div>

          {!isCollapsed && (
            <div className="bg-[#B22222] rounded-b-lg px-12 lg:p-4 py-6 lg:space-y-4 text-lg overflow-x-auto md:text-2xl lg:pt-16">
              <div className="hidden text-white font-semibold mb-2">
                <div className="w-12 flex-shrink-0">S. no.</div>
                <div className="flex-grow">Title</div>
                <div className="w-32 flex-shrink-0">Type</div>
                <div className="w-32 flex-shrink-0">From</div>
                <div className="w-32 flex-shrink-0">To</div>
                <div className="w-20 flex-shrink-0"></div>
              </div>
              {records.map((record, i) => (
                <div
                  key={record.id}
                  className="flex flex-col lg:flex-row items-start mb-2 lg:items-center"
                >
                  <div className="bg-slate-300 p-2 rounded flex-grow lg:max-w-16 min-w-12 lg:w-16 lg:flex-shrink-0 mb-2 lg:mb-0 flex justify-center">
                    <span className="">{record.id}.</span>
                  </div>
                  <div className="bg-white lg:min-w-44 p-2 rounded w-full flex-grow mb-2 lg:mb-0 lg:ml-2 relative">
                    <div
                      className={`${
                        i === 0
                          ? "lg:block column-labels absolute -top-11 left-0 text-white text-[1.6rem]"
                          : ""
                      } hidden`}
                    >
                      <div>Title</div>
                    </div>
                    <input
                      type="text"
                      value={record.companyName}
                      onChange={(e) =>
                        handleUpdateRecord(
                          record.id,
                          "companyName",
                          e.target.value
                        )
                      }
                      className="w-full outline-none"
                      readOnly={!record.isEditing}
                    />
                  </div>
                  <div className="w-full lg:w-32 lg:flex-shrink-0 flex-grow lg:max-w-56 mb-2 lg:mb-0 lg:ml-2 relative">
                    <div
                      className={`${
                        i === 0
                          ? "lg:block column-labels absolute -top-12 text-white text-[1.6rem]"
                          : ""
                      } hidden`}
                    >
                      <div>Type</div>
                    </div>
                    <Select
                      value={record.natureOfInternship}
                      onValueChange={(value) =>
                        handleUpdateRecord(
                          record.id,
                          "natureOfInternship",
                          value
                        )
                      }
                      disabled={!record.isEditing}
                    >
                      <SelectTrigger className="bg-white border-0 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-white p-2 rounded w-full flex-grow lg:max-w-72 lg:w-56 lg:flex-shrink-0 mb-2 lg:mb-0 lg:ml-2 mr-0.5 relative">
                    <div
                      className={`${
                        i === 0
                          ? "lg:block column-labels absolute -top-11 left-0 text-white text-[1.6rem]"
                          : ""
                      } hidden`}
                    >
                      <div>From</div>
                    </div>
                    <input
                      type="date"
                      value={record.startDate}
                      onChange={(e) =>
                        handleUpdateRecord(
                          record.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-full outline-none"
                      readOnly={!record.isEditing}
                    />
                  </div>
                  <div className="flex w-full lg:w-72 flex-grow lg:flex-shrink-0 mb-2 lg:mb-0 lg:ml-2  flex-col lg:flex-row lg:items-center items-start">
                    <div className="bg-white p-2 mb-2 lg:mb-0 rounded flex-grow lg:w-32 mr-2 w-full relative">
                      <div
                        className={`${
                          i === 0
                            ? "lg:block column-labels absolute -top-11 left-0 text-white text-[1.6rem]"
                            : ""
                        } hidden`}
                      >
                        <div>To</div>
                      </div>
                      <input
                        type="date"
                        value={record.endDate}
                        onChange={(e) =>
                          handleUpdateRecord(
                            record.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-full"
                        readOnly={!record.isEditing}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-gray-300 h-[31px] text-lg hover:bg-gray-400 whitespace-nowrap lg:h-[32px] lg:w-20 self-start"
                      onClick={() => toggleEdit(record.id)}
                    >
                      {record.isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex flex-col justify-between items-start lg:items-center gap-2">
                <Button
                  className="bg-[#B22222] text-2xl hover:bg-[#8B0000] text-white border border-white w-full lg:w-auto py-7 self-end"
                  onClick={handleAddRecord}
                >
                  <Plus className="h-8 mr-2 scale-150" />
                  Add another
                </Button>
                <div className="text-white mt-4 lg:mt-0 text-2xl lg:text-3xl lg:w-auto self-start">
                  Upload Certificate(s) Folder Link:
                  <input
                    type="text"
                    className="ml-2 bg-transparent border-b border-white outline-none w-full lg:w-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
