function TaskFilters({ status, handleOnClick, className }) {
    return (
        <div className={className}>
            <button
                className={
                    status === 'all'
                        ? 'p-3 cursor-pointer text-gray-500'
                        : 'p-3 cursor-pointer hover:text-gray-400'
                }
                onClick={() => handleOnClick('all')}
            >
                All
            </button>
            <button
                className={
                    status === 'active'
                        ? 'p-3 cursor-pointer text-gray-500'
                        : 'p-3 cursor-pointer hover:text-gray-400'
                }
                onClick={() => handleOnClick('active')}
            >
                Active
            </button>
            <button
                className={
                    status === 'completed'
                        ? 'p-3 cursor-pointer text-gray-500'
                        : 'p-3 cursor-pointer hover:text-gray-400'
                }
                onClick={() => handleOnClick('completed')}
            >
                Completed
            </button>
        </div>
    );
}
export default TaskFilters;
