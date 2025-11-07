import React from 'react';
import BoardList from '../components/BoardList';

const Page: React.FC = () => {
    return (
        <div>
            <h1>Kanban Board</h1>
            <BoardList />
        </div>
    );
};

export default Page;