function TaskCard({ id, status, desc, handleOnChangeTask }) {
    return (
        <div className='flex flex-row'>
            <div className='w-16 flex justify-center items-center'>
                <input
                    onChange={(e) => handleOnChangeTask(e, id)}
                    className={
                        status === 'active'
                            ? 'appearance-none ring-1 ring-gray-600 cursor-pointer size-6 rounded-full bg-no-repeat bg-center'
                            : 'appearance-none ring-transparent cursor-pointer size-6 rounded-full bg-no-repeat bg-center bg-[url("assets/images/icon-check.svg"),linear-gradient(145deg,skyblue,purple)]'
                    }
                    // className='appearance-none ring-1 ring-gray-600 cursor-pointer size-6 rounded-full bg-no-repeat bg-center checked:ring-transparent checked:bg-[url("assets/images/icon-check.svg"),linear-gradient(145deg,skyblue,purple)] '
                    type='checkbox'
                />
            </div>
            <p
                className={
                    status === 'completed' ? 'grow p-4 text-gray-600 line-through' : 'grow p-4'
                }
            >
                {desc}
            </p>
        </div>
    );
}
export default TaskCard;
