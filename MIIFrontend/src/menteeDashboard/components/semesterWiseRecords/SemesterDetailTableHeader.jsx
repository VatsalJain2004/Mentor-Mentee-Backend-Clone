const SemesterDetailTableHeader = () => {
    return (
        <>
            <thead className="text-2xl text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3" rowSpan={2}>
                    Course Registration
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3" rowSpan={2}>
                    Mid Sem I Marks
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3" rowSpan={2}>
                    Mid Sem II Marks
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3" rowSpan={2}>
                    End Term Marks/Grade
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3" rowSpan={2}>
                    Practical Marks/Grade
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3 text-center" colSpan={3}>
                    Attendance %
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3 text-center" colSpan={9}>
                    Quiz/Assignment
                  </th>
                  <th className="py-3 h-0"  rowSpan={2}><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3 text-center" colSpan={2} rowSpan={2}>
                    Remark
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    P
                  </th>
                  <th className="py-3 h-0"><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3">
                    T
                  </th>
                  <th scope="col" className="px-6 py-3">
                    I
                  </th>
                  <th className="py-3 h-0"><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3">
                    II
                  </th>
                  <th className="py-3 h-0"><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3">
                    III
                  </th>
                  <th className="py-3 h-0"><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3">
                    IV
                  </th>
                  <th className="py-3 h-0"><div className="h-full w-1 border-r border-black"></div></th>
                  <th scope="col" className="px-6 py-3">
                    V
                  </th>
                </tr>
              </thead>
        </>
    )
}

export default SemesterDetailTableHeader;