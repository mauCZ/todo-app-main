function TaskList({ status, setStatus, children }) {
    function handleOnClick(statusStr) {
        setStatus(statusStr);
    }

    return (
        <div className="w-lg border mx-auto z-1 relative">
            <div className="flex flex-row justify-between bg-blue-900">
                <h1>TODO</h1>
                <button>Theme toggle</button>
            </div>
            <ul>
                <div>
                    <input type='checkbox' />
                    <input type='text' />
                </div>
                {children}
                <div>
                    <p>X items left</p>
                    <button onClick={() => handleOnClick('all')}>All</button>
                    <button onClick={() => handleOnClick('active')}>Active</button>
                    <button onClick={() => handleOnClick('completed')}>Completed</button>
                    <button>Clear Completed</button>
                </div>
            </ul>
        </div>
    );
}
export default TaskList;
