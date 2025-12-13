import { FC } from 'react';
import styles from '../ui/app-header/app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@selectors';

export const AppHeader: FC = () => {
  const location = useLocation();
  const userName = useSelector(getUserSelector);
  const getIconType = (path: string): 'primary' | 'secondary' =>
    location.pathname === path ? 'primary' : 'secondary';
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            end
            className={({ isActive, isPending }) =>
              `${styles.link} ${isPending ? styles.pending : isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon type={getIconType('/')} />
            <p
              className={`text text_type_main-default ml-2 mr-10 ${getIconType('/') === 'secondary' ? 'text_color_inactive' : ''}`}
            >
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to='/feed'
            end
            className={({ isActive, isPending }) =>
              `${styles.link} ${isPending ? styles.pending : isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon type={getIconType('/feed')} />
            <p
              className={`text text_type_main-default ml-2 ${getIconType('/feed') === 'secondary' ? 'text_color_inactive' : ''}`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className={''} />
        </div>

        <NavLink
          to='/profile'
          end
          className={({ isActive, isPending }) =>
            `${styles.link} ${isPending ? styles.pending : isActive ? styles.link_active : ''}`
          }
        >
          <ProfileIcon type={getIconType('/profile')} />
          <p
            className={`text text_type_main-default ml-2 ${getIconType('/profile') === 'secondary' ? 'text_color_inactive' : ''}`}
          >
            {userName?.name || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
