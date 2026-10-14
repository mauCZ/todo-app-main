import { useContext } from 'react';
import { ThemeContext } from '../contexts/Contexts';

function TaskCreator({ ref }) {
    const theme = useContext(ThemeContext);

    return (
        <div
            className={`flex flex-row rounded-md mt-9 mb-6 ${theme === 'light' ? 'bg-white text-navy-950' : 'bg-navy-900 text-gray-300'}`}
        >
            <div className='w-16 flex justify-center items-center'>
                <input
                    className='appearance-none ring-1 ring-gray-600 cursor-pointer size-6 rounded-full bg-no-repeat bg-center checked:ring-transparent checked:bg-[url("assets/images/icon-check.svg"),linear-gradient(145deg,skyblue,purple)] '
                    type='checkbox'
                />
            </div>
            <input
                ref={ref}
                className={`block grow p-4 ${theme === 'light' ? 'text-navy-950 placeholder:text-gray-300' : 'text-gray-300 placeholder:text-purple-700 '}`}
                type='text'
                placeholder='Create a new todo...'
            />
        </div>
    );
}
export default TaskCreator;
