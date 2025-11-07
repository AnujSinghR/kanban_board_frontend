const API_BASE_URL = 'https://your-backend-api-url.com/api';

export const fetchBoards = async () => {
    const response = await fetch(`${API_BASE_URL}/boards`);
    if (!response.ok) {
        throw new Error('Failed to fetch boards');
    }
    return response.json();
};

export const createBoard = async (boardData: { title: string }) => {
    const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
    });
    if (!response.ok) {
        throw new Error('Failed to create board');
    }
    return response.json();
};

// Additional API functions can be added here for managing tasks, etc.