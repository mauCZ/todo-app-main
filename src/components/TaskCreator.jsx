function TaskCreator({ ref }) {
    return (
        <div className='flex flex-row bg-blue-900 rounded-md mt-12 mb-6'>
            <div className='w-16 flex justify-center items-center'>
                <input
                    className='appearance-none ring-1 ring-gray-600 cursor-pointer size-6 rounded-full bg-no-repeat bg-center checked:ring-transparent checked:bg-[url("assets/images/icon-check.svg"),linear-gradient(145deg,skyblue,purple)] '
                    type='checkbox'
                />
            </div>
            <input
                ref={ref}
                className='block grow p-4'
                type='text'
                placeholder='Create a new todo...'
            />
        </div>
    );
}
export default TaskCreator;
