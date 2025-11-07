import React, { useEffect, useState } from 'react';
import { fetchBoards } from '../utils/api';
import { Board } from '../types';

const BoardList: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBoards = async () => {
            try {
                const fetchedBoards = await fetchBoards();
                setBoards(fetchedBoards);
            } catch (err) {
                setError('Failed to load boards');
            } finally {
                setLoading(false);
            }
        };

        loadBoards();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Board List</h2>
            <ul>
                {boards.map(board => (
                    <li key={board.id}>{board.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;