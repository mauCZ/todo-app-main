import iconSun from '../assets/images/icon-sun.svg';

function TaskList({ children }) {
    return (
        <div className='w-xs mx-auto z-1 relative sm:w-lg top-20 '>
            <div className='flex flex-row justify-between'>
                <h1 className='text-4xl font-bold tracking-[0.8rem]'>TODO</h1>
                <button className='hover:cursor-pointer'>
                    <img src={iconSun} alt='' />
                </button>
            </div>
            <ul>{children}</ul>
        </div>
    );
}
export default TaskList;
