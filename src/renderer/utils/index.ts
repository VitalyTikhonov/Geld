import cn from 'classnames';
import { DBResponse } from 'types';
import { Asset } from '../../types/Asset';

type Props = { isActive: boolean };

export function setClassnames({ isActive }: Props): string {
  return isActive
    ? cn('sidebar--menu_link menu_link sidebar--menu_link-active')
    : 'sidebar--menu_link menu_link';
}

export async function requestAssets(): Promise<DBResponse<Asset[]>> {
  return window.electron.getAssets();
}
