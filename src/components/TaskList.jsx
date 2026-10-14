import iconSun from '../assets/images/icon-sun.svg';
import iconMoon from '../assets/images/icon-moon.svg';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Contexts';

function TaskList({ toggleTheme, children }) {
    const theme = useContext(ThemeContext);

    return (
        <div className='w-xs mx-auto z-1 relative sm:w-lg top-12 shadow-2xl'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-4xl font-bold tracking-[0.8rem]'>TODO</h1>

                <button onClick={() => toggleTheme()} className='cursor-pointer hover:scale-110'>
                    <img src={theme === 'light' ? iconSun : iconMoon} alt='theme toggle' />
                </button>
            </div>
            <ul>{children}</ul>
        </div>
    );
}
export default TaskList;
