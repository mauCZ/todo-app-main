import { useEffect, useRef, useState } from 'react';
import { DragDropProvider, useDroppable } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import TaskList from './components/TaskList';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import TaskCreator from './components/TaskCreator';
import { ThemeContext } from './contexts/Contexts';
import HeroBackground from './components/HeroBackground';

function App({ id }) {
    const [tasks, setTasks] = useState([]);
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
            <main
                className={`min-h-screen pb-38 text-gray-50 ${theme === 'light' ? 'text-white bg-gray-50' : 'text-black bg-navy-950'}`}
            >
                <dialog
                    className={`w-sm text-center rounded-sm py-4 px-1 m-auto backdrop:bg-black/60 backdrop:backdrop-blur-xs ${theme === 'light' ? 'bg-gray-100' : 'bg-navy-900'}`}
                    ref={dialogRef}
                >
                    <p
                        className={`font-semibold mb-6 ${theme === 'light' ? 'text-navy-850' : 'text-gray-400'}`}
                    >
                        Are you sure you want to delete this task?
                    </p>
                    <div className='flex flex-row w-3/5 mx-auto justify-around'>
                        <button
                            className='cursor-pointer bg-red-700 text-gray-50 rounded-sm py-2 px-4 hover:bg-red-800'
                            onClick={() => {
                                dialogRef.current.close();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className='cursor-pointer bg-green-700 text-gray-50 rounded-sm py-2 px-4 hover:bg-green-800'
                            onClick={handleConfirmedDeleteTask}
                        >
                            Accept
                        </button>
                    </div>
                </dialog>

                <HeroBackground />

                <DragDropProvider
                    onDragEnd={(event) => {
                        if (event.canceled) return;

                        const { source } = event.operation;

                        if (isSortable(source)) {
                            const { initialIndex, index } = source;
                            console.log(initialIndex + ' ' + index);

                            if (initialIndex !== index) {
                                const newTasks = [...tasks];
                                const [removed] = newTasks.splice(initialIndex, 1);
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

                        <div
                            ref={droppableRef}
                            className={`divide-y rounded-t-sm ${theme === 'light' ? 'divide-gray-300' : 'divide-purple-800'}`}
                        >
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

                        <div
                            className={`border-t border-gra flex flex-row mb-6 font-semibold relative rounded-b-sm ${theme === 'light' ? 'bg-white text-gray-300 border-gray-300' : 'bg-navy-900 text-purple-700 border-purple-800'}`}
                        >
                            <p className='text-center grow p-4 text-xs'>
                                {getTasksLeftToDo()} items left
                            </p>

                            <TaskFilters
                                status={status}
                                handleOnClick={(e) => handleOnclick(e)}
                                className={`col-start-1 col-span-3 row-start-2 flex flex-row justify-center absolute top-20 w-full sm:relative sm:top-0 sm:w-50 ${theme === 'light' ? 'bg-white shadow-md' : 'bg-navy-900 shadow-md'}`}
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

                <p
                    className={`${theme === 'light' ? 'bg-gray-50' : 'bg-navy-950'} w-full text-center fixed bottom-0 text-gray-600 text-lg z-2`}
                >
                    Drag and Drop to reorder list
                </p>
            </main>
        </ThemeContext.Provider>
    );
}

export default App;
