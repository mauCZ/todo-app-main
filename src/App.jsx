import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskCard from './components/Task';

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, desc: 'Jog around the park 3x', status: 'active' },
        { id: 2, desc: '10 minutes meditation', status: 'active' },
        { id: 3, desc: 'Read for 1 hour', status: 'active' },
        { id: 4, desc: 'Pick up groceries', status: 'active' },
        { id: 5, desc: 'Complete school homework', status: 'active' },
    ]);
    const [status, setStatus] = useState('all');

    function filterTasks(filterStatus) {
        return tasks.filter((task) => task.status === filterStatus || status === 'all');
    }

    return (
        <main className='bg-blue-950 min-h-screen text-white'>
            <div
                className='w-full h-48 absolute z-0 bg-no-repeat bg-cover bg-center bg-[url("assets/images/bg-mobile-dark.jpg")] 
                 sm:bg-[url("assets/images/bg-desktop-dark.jpg")] sm:h-64'
            ></div>
            <TaskList status={status} setStatus={setStatus}>
                {filterTasks(status).map((task) => (
                    <TaskCard key={task.id} id={task.id} status={task.status} desc={task.desc} />
                ))}
            </TaskList>
            <p className='w-full text-center absolute bottom-10 text-gray-600 text-lg'>
                Drag and Drop to reorder list
            </p>
        </main>
    );
}

export default App;
