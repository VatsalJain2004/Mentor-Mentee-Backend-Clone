import { createContext, useContext, useState } from "react";

const SemesterRecordsContext = createContext();

function SemesterRecordsProvider({ children }) {
  const [semesterRecordsData, setSemesterRecordsData] = useState([]);
  const value = {
    semesterRecordsData,
    setSemesterRecordsData,
  };
  return (
    <SemesterRecordsContext.Provider value={value}>
      {children}
    </SemesterRecordsContext.Provider>
  );
}

function useSemesterRecords() {
  const semesterRecordsData = useContext(SemesterRecordsContext);
  if (semesterRecordsData === undefined)
    throw new Error("Context used beyond its scopes");
  return semesterRecordsData;
}

export { SemesterRecordsProvider, useSemesterRecords };
