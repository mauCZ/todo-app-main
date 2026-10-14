import { useContext } from 'react';
import { ThemeContext } from '../contexts/Contexts';
import bgDarkMobile from '../assets/images/bg-mobile-dark.jpg';
import bgDarkDesktop from '../assets/images/bg-desktop-dark.jpg';
import bgLightMobile from '../assets/images/bg-mobile-light.jpg';
import bgLightDesktop from '../assets/images/bg-desktop-light.jpg';

function HeroBackground() {
    const theme = useContext(ThemeContext);

    return (
        <picture className='w-full h-60 absolute z-0'>
            <source
                media='(min-width: 640px)'
                srcSet={theme === 'light' ? bgLightDesktop : bgDarkDesktop}
            />
            <img
                src={theme === 'light' ? bgLightMobile : bgDarkMobile}
                alt='backgroud desktop'
                className='size-full object-cover object-center'
            />
        </picture>
    );
}
export default HeroBackground;
