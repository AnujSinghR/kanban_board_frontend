'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  board: string;
}

interface Board {
  _id: string;
  name: string;
}

export default function KanbanBoard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [newBoardName, setNewBoardName] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const API_URL = 'https://kanban-board-backend-three.vercel.app/';

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      fetchTasks(selectedBoard);
    }
  }, [selectedBoard]);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards`);
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchTasks = async (boardId: string) => {
    try {
      const response = await axios.get(`${API_URL}/boards/${boardId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/boards`, { name: newBoardName });
      setNewBoardName('');
      fetchBoards();
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/boards/tasks`, {
        id: selectedBoard,
        title: newTask.title,
        description: newTask.description,
        status: 'todo'
      });
      setNewTask({ title: '', description: '' });
      fetchTasks(selectedBoard);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: 'todo' | 'doing' | 'done') => {
    try {
      await axios.put(`${API_URL}/tasks/${taskId}`, { status: newStatus });
      fetchTasks(selectedBoard);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchTasks(selectedBoard);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Kanban Board</h1>
        
        {/* Create Board Form */}
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-wide mb-4">Create Board</h2>
          <form onSubmit={createBoard} className="space-y-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="w-full px-3 py-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
            >
              Create Board
            </button>
          </form>
        </div>

        {/* Boards List */}
        <div className="flex-1">
          <h2 className="text-sm uppercase tracking-wide mb-4">Your Boards</h2>
          <div className="space-y-2">
            {boards.map((board) => (
              <button
                key={board._id}
                onClick={() => setSelectedBoard(board._id)}
                className={`w-full text-left px-4 py-2 rounded transition duration-200 ${
                  selectedBoard === board._id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                {board.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white shadow px-6 py-4">
          <h2 className="text-xl font-bold">
            {selectedBoard 
              ? boards.find(b => b._id === selectedBoard)?.name 
              : 'Select a Board'}
          </h2>
        </div>

        {selectedBoard ? (
          <div className="flex-1 p-6 overflow-x-auto">
            {/* Add Task Form */}
            <div className="mb-6">
              <form onSubmit={createTask} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task title"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task description"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition duration-200"
                >
                  Add Task
                </button>
              </form>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-3 gap-6 min-h-[calc(100vh-300px)]">
              {['todo', 'doing', 'done'].map((status) => (
                <div 
                  key={status} 
                  className="bg-gray-100 rounded-lg p-4"
                >
                  <h3 className="text-lg font-bold mb-4 capitalize flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      status === 'todo' ? 'bg-yellow-500' :
                      status === 'doing' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></span>
                    {status}
                  </h3>
                  <div className="space-y-3">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <div 
                          key={task._id} 
                          className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition duration-200"
                        >
                          <h4 className="font-bold">{task.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <select
                              value={task.status}
                              onChange={(e) => updateTaskStatus(task._id, e.target.value as 'todo' | 'doing' | 'done')}
                              className="flex-1 px-2 py-1 border rounded text-sm"
                            >
                              <option value="todo">Todo</option>
                              <option value="doing">Doing</option>
                              <option value="done">Done</option>
                            </select>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a board from the sidebar to view tasks
          </div>
        )}
      </div>
    </div>
  );
}