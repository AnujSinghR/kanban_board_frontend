export interface Board {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    boardId: string;
    createdAt: string;
    updatedAt: string;
}