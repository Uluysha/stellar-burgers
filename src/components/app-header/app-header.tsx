import { FC } from 'react';
import styles from '../ui/app-header/app-header.module.css';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useSelector } from '@store';
import { getUserSelector } from '@selectors';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserSelector);

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
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={`text text_type_main-default ml-2 mr-10 ${!isActive ? 'text_color_inactive' : ''}`}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink
            to='/feed'
            end
            className={({ isActive, isPending }) =>
              `${styles.link} ${isPending ? styles.pending : isActive ? styles.link_active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={`text text_type_main-default ml-2 ${!isActive ? 'text_color_inactive' : ''}`}
                >
                  Лента заказов
                </p>
              </>
            )}
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
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={`text text_type_main-default ml-2 ${!isActive ? 'text_color_inactive' : ''}`}
              >
                {userName?.name || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
