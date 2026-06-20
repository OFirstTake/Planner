export const db = [
    {
        id: 1,
        title: "Học React",
        tasks: [
            { 
                id: 101, 
                name: "Học Component", 
                createdDate: "2026-06-10", 
                status: true, 
                days: ["Mon", "Wed"],
                deadline: "2026-06-15",
                totalOccurrences: 2 
            }, 
            { 
                id: 102, 
                name: "Học Props", 
                createdDate: "2026-06-11", 
                status: false, 
                days: ["Tue"], 
                deadline: "2026-06-16",
                totalOccurrences: 1
            }
        ]
    },
    {
        id: 2,
        title: "Việc nhà",
        tasks: [
            { 
                id: 201, 
                name: "Quét nhà", 
                createdDate: "2026-06-12", 
                status: false, 
                days: ["Wed", "Fri"], 
                deadline: "2026-06-19",
                totalOccurrences: 2
            },
            { 
                id: 202, 
                name: "Giặt đồ", 
                createdDate: "2026-06-14", 
                status: false, 
                days: ["Sun"], 
                deadline: "2026-06-25",
                totalOccurrences: 1
            }
        ]
    }
];