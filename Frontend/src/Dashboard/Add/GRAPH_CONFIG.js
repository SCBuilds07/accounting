export const GRAPH_CONFIGS = {
    "Opbrengst per week": {
        questions: [
            { id: "week1", label: "Hoeveel heb je in week 1 verdiend?", type: "number" },
            { id: "week2", label: "Hoeveel heb je in week 2 verdiend?", type: "number" },
            { id: "week3", label: "Hoeveel heb je in week 3 verdiend?", type: "number" },
            { id: "week4", label: "Hoeveel heb je in week 4 verdiend?", type: "number" },
        ],
        graph_type : "bar"
    },
    "Uitgaven per week": {
        questions: [
            { id: "week1", label: "Hoeveel heb je in week 1 uitgegeven?", type: "number" },
            { id: "week2", label: "Hoeveel heb je in week 2 uitgegeven?", type: "number" },
            { id: "week3", label: "Hoeveel heb je in week 3 uitgegeven?", type: "number" },
            { id: "week4", label: "Hoeveel heb je in week 4 uitgegeven?", type: "number" },
        ],
        graph_type : "bar"
    }
}