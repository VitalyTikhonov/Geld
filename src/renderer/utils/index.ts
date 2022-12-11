import cn from 'classnames';

type Props = { isActive: boolean };

export function setClassnames({ isActive }: Props): string {
  return isActive
    ? cn('sidebar--menu_link menu_link sidebar--menu_link-active')
    : 'sidebar--menu_link menu_link';
}
