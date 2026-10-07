import crossSvg from '../assets/images/icon-cross.svg';

function TaskCard({ handleDeleteTask, id, status, desc, handleOnChangeTask }) {
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
            <button
                onClick={() => handleDeleteTask(id)}
                className='cursor-pointer w-4 mr-6 transition duration-200 hover:scale-150'
            >
                <img className='w-full' src={crossSvg} alt='' />
            </button>
        </div>
    );
}
export default TaskCard;
