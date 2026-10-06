import { useEffect, useRef, useState } from 'react';
import TaskList from './components/TaskList';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import TaskCreator from './components/TaskCreator';

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, desc: 'Jog around the park 3x', status: 'active' },
        { id: 2, desc: '10 minutes meditation', status: 'active' },
        { id: 3, desc: 'Read for 1 hour', status: 'active' },
        { id: 4, desc: 'Pick up groceries', status: 'active' },
        { id: 5, desc: 'Complete school homework', status: 'active' },
    ]);
    const refId = useRef(100);
    const inputRef = useRef(null);
    const [status, setStatus] = useState('all');

    function filterTasks(filterStatus) {
        return tasks.filter((task) => task.status === filterStatus || status === 'all');
    }

    function handleOnclick(statusStr) {
        setStatus(statusStr);
    }

    function isEnterKeyPressed(keyPressedStr) {
        return keyPressedStr === 'Enter' || keyPressedStr === 'NumpadEnter';
    }

    function handleOnChangeTask(e, id) {
        const newTasks = tasks.map((task) =>
            task.id !== id
                ? task
                : { ...task, status: task.status === 'completed' ? 'active' : 'completed' },
        );
        setTasks(newTasks);
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isEnterKeyPressed(e.code) &&
                document.activeElement === inputRef.current &&
                inputRef.current.value.length > 0
            ) {
                const newTask = {
                    id: refId.current,
                    desc: inputRef.current.value,
                    status: 'active',
                };
                setTasks((prevTasks) => {
                    return [...prevTasks, newTask];
                });

                refId.current = refId.current + 1;
                inputRef.current.value = '';
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <main className='bg-blue-950 min-h-screen text-white'>
            <div className='w-full h-48 absolute z-0 bg-no-repeat bg-cover bg-center bg-[url("assets/images/bg-mobile-dark.jpg")] sm:bg-[url("assets/images/bg-desktop-dark.jpg")] sm:h-64'></div>

            <TaskList status={status} setStatus={setStatus}>
                <TaskCreator ref={inputRef} />

                <div className='divide-y divide-gray-700 rounded-t-sm bg-blue-900'>
                    {filterTasks(status).map((task) => (
                        <TaskCard
                            handleOnChangeTask={handleOnChangeTask}
                            id={task.id}
                            key={task.id}
                            status={task.status}
                            desc={task.desc}
                        />
                    ))}
                </div>

                <div className='bg-blue-900 flex flex-row mb-6 relative border-t border-gray-700 rounded-b-sm'>
                    <p className='text-center grow p-4 text-xs'>X items left</p>

                    <TaskFilters
                        handleOnClick={(e) => handleOnclick(e)}
                        className='bg-blue-900 col-start-1 col-span-3 row-start-2 flex flex-row justify-center absolute top-20 w-full sm:relative sm:top-0 sm:w-50'
                    />

                    <button className='grow p-4 col-start-3 text-center text-xs'>
                        Clear Completed
                    </button>
                </div>
            </TaskList>

            <p className='w-full text-center absolute bottom-10 text-gray-600 text-lg'>
                Drag and Drop to reorder list
            </p>
        </main>
    );
}

export default App;
