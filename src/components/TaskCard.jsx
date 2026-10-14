import { useContext } from 'react';
import crossSvg from '../assets/images/icon-cross.svg';
import { useSortable } from '@dnd-kit/react/sortable';
import { ThemeContext } from '../contexts/Contexts';

function TaskCard({ handleDeleteTask, id, index, status, desc, handleOnChangeTask }) {
    const { ref } = useSortable({
        id: `${id}`,
        index,
    });
    const theme = useContext(ThemeContext);

    return (
        <div
            ref={ref}
            className={`flex flex-row ${theme === 'light' ? 'bg-white text-navy-950' : 'bg-navy-900 text-gray-300'}`}
        >
            <div className='peer w-16 flex justify-center items-center'>
                <input
                    onChange={(e) => handleOnChangeTask(e, id)}
                    className={
                        status === 'active'
                            ? `appearance-none ring-1 cursor-pointer size-6 rounded-full bg-no-repeat bg-center ${theme === 'light' ? 'ring-gray-300' : 'ring-purple-700'}`
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
                className='peer-has-checked:hidden group relative cursor-pointer w-3 mr-6 my-4'
            >
                <img
                    className='w-full group-hover:scale-150 transition delay-120'
                    src={crossSvg}
                    alt=''
                />
                {/* <p className='border-none opacity-0 w-24 bg-gray-800 rounded-sm absolute bottom-full left-1/2 -translate-x-1/2 transition-opacity delay-120 duration-150 group-hover:opacity-100'>
                    delete task
                </p> */}
            </button>
        </div>
    );
}
export default TaskCard;
