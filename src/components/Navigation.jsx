import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
import NavigationMenu from './NavigationMenu';

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  const maskTransitions = useTransition(showMenu, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const menuTransitions = useTransition(showMenu, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
  });

  return (
    <nav>
      <span className='text-xl'>
        <FaBars onClick={() => setShowMenu(!showMenu)} />
      </span>
      {maskTransitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className='bg-black-t-50 fixed top-0 left-0 w-screen h-screen z-50'
              onClick={() => setShowMenu(false)}
            ></animated.div>
          )
      )}

      {menuTransitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className='fixed bg-white top-0 left-0 w-4/5 h-screen z-50 shadow p-3'
            >
              <NavigationMenu closeMenu={() => setShowMenu(false)} />
            </animated.div>
          )
      )}
    </nav>
  );
}
