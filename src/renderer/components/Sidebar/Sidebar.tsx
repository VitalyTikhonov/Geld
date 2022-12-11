import './Sidebar.scss';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { setClassnames } from '../../utils';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className={cn('sidebar--headline_link menu_link')}>
        <h1 className="sidebar--headline">Geld</h1>
      </Link>

      <nav className="sidebar--menu">
        <ul className="sidebar--menu_list">
          <li className="sidebar--menu_item">
            <NavLink to="/" className={setClassnames}>
              Операции
            </NavLink>
          </li>

          <li className="sidebar--menu_item">
            <NavLink to="balance" className={setClassnames}>
              Баланс
            </NavLink>
          </li>

          <li className="sidebar--menu_item">
            <NavLink to="stats" className={setClassnames}>
              Статистика
            </NavLink>
          </li>

          <li className="sidebar--menu_item">
            <NavLink to="plan" className={setClassnames}>
              План
            </NavLink>
          </li>

          <li className="sidebar--menu_item">
            <NavLink to="settings" className={setClassnames}>
              Настройки
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
