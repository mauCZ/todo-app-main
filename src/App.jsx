import { useEffect, useRef, useState } from 'react';
import { DragDropProvider, useDroppable } from '@dnd-kit/react';
import {isSortable} from '@dnd-kit/react/sortable';
import TaskList from './components/TaskList';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import TaskCreator from './components/TaskCreator';
import { ThemeContext } from './contexts/Contexts';
import HeroBackground from './components/HeroBackground';

function App({ id }) {
    const [tasks, setTasks] = useState([
        { id: 1, desc: 'Jog around the park 3x', status: 'active' },
        { id: 2, desc: '10 minutes meditation', status: 'active' },
        { id: 3, desc: 'Read for 1 hour', status: 'active' },
        { id: 4, desc: 'Pick up groceries', status: 'active' },
        { id: 5, desc: 'Complete school homework', status: 'active' },
    ]);
    const [theme, setTheme] = useState('light');
    const refId = useRef(100);
    const inputRef = useRef(null);
    const dialogRef = useRef(null);
    const taskId = useRef(null);
    const [status, setStatus] = useState('all');
    const { droppableRef } = useDroppable({ id });

    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }

    function filterTasks(filterStatus) {
        return tasks.filter((task) => task.status === filterStatus || status === 'all');
    }

    function getTasksLeftToDo() {
        return tasks.filter((task) => task.status === 'active').length;
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

    function handleOnClickClearTasks() {
        const newTasks = tasks.filter((task) => task.status === 'active');
        setTasks(newTasks);
    }

    function handleDeleteTask(id) {
        dialogRef.current.showModal();
        taskId.current = id;
        // const newTasks = tasks.filter((task) => task.id !== id);
        // setTasks(newTasks);
    }

    function handleConfirmedDeleteTask() {
        const newTasks = tasks.filter((task) => task.id !== taskId.current);
        setTasks(newTasks);
        dialogRef.current.close();
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
        <ThemeContext.Provider value={theme}>
            <main className='bg-blue-950 h-screen text-white'>
                <dialog
                    className='w-xs rounded-sm bg-blue-950 p-5 m-auto backdrop:bg-black/60 backdrop:backdrop-blur-xs'
                    ref={dialogRef}
                >
                    <p className='text-white font-semibold mb-6'>
                        Are you sure you want to delete this task?
                    </p>
                    <div className='flex flex-row w-3/5 mx-auto justify-around'>
                        <button
                            className='cursor-pointer bg-red-700 text-white rounded-sm py-2 px-4 hover:bg-red-800'
                            onClick={() => {
                                dialogRef.current.close();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className='cursor-pointer bg-green-700 text-white rounded-sm py-2 px-4 hover:bg-green-800'
                            onClick={handleConfirmedDeleteTask}
                        >
                            Accept
                        </button>
                    </div>
                </dialog>

                <HeroBackground />

                <DragDropProvider
                    onDragEnd={(event) => {
                        if(event.canceled) return;
						
						const {source} = event.operation;
						
						if(isSortable(source)){
							const {initialIndex, index} = source;
							console.log(initialIndex + " " + index);
							
							if(initialIndex !== index){
								const newTasks = [...tasks];
								const [removed] = newTasks.splice(initialIndex,1);
								newTasks.splice(index, 0, removed);
								setTasks(newTasks);
							}
						}
                    }}
                >
                    <TaskList
                        id={1}
                        toggleTheme={toggleTheme}
                        status={status}
                        setStatus={setStatus}
                    >
                        <TaskCreator ref={inputRef} />

                        <div ref={droppableRef} className='divide-y divide-gray-700 rounded-t-sm'>
                            {filterTasks(status).map((task, index) => (
                                <TaskCard
                                    handleOnChangeTask={handleOnChangeTask}
                                    id={task.id}
                                    index={index}
                                    key={task.id}
                                    status={task.status}
                                    desc={task.desc}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </div>

                        <div className='bg-blue-900 flex flex-row mb-6 relative border-t border-gray-700 rounded-b-sm'>
                            <p className='text-center grow p-4 text-xs'>
                                {getTasksLeftToDo()} items left
                            </p>

                            <TaskFilters
                                status={status}
                                handleOnClick={(e) => handleOnclick(e)}
                                className='bg-blue-900 col-start-1 col-span-3 row-start-2 flex flex-row justify-center absolute top-20 w-full sm:relative sm:top-0 sm:w-50'
                            />

                            <button
                                onClick={handleOnClickClearTasks}
                                className='grow p-4 col-start-3 text-center text-xs cursor-pointer hover:text-gray-400'
                            >
                                Clear Completed
                            </button>
                        </div>
                    </TaskList>
                </DragDropProvider>

                <p className='w-full text-center absolute bottom-4 text-gray-600 text-lg'>
                    Drag and Drop to reorder list
                </p>
            </main>
        </ThemeContext.Provider>
    );
}

export default App;
