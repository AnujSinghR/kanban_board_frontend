import React, { useState } from 'react';
import { createBoard } from '../utils/api';

const CreateBoardForm: React.FC = () => {
    const [boardName, setBoardName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!boardName) return;

        try {
            await createBoard({ name: boardName });
            setBoardName('');
            // Optionally, you can add a success message or refresh the board list here
        } catch (error) {
            console.error('Error creating board:', error);
            // Optionally, handle the error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
                required
            />
            <button type="submit">Create Board</button>
        </form>
    );
};

export default CreateBoardForm;