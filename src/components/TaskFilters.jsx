function TaskFilters({ handleOnClick, className }) {
    return (
        <div className={className}>
            <button className='p-3 cursor-pointer' onClick={() => handleOnClick('all')}>
                All
            </button>
            <button className='p-3 cursor-pointer' onClick={() => handleOnClick('active')}>
                Active
            </button>
            <button className='p-3 cursor-pointer' onClick={() => handleOnClick('completed')}>
                Completed
            </button>
        </div>
    );
}
export default TaskFilters;
