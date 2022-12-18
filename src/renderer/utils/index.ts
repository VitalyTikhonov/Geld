import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Asset } from '../../types/Asset';

type Props = { isActive: boolean };

export function setClassnames({ isActive }: Props): string {
  return isActive
    ? cn('sidebar--menu_link menu_link sidebar--menu_link-active')
    : 'sidebar--menu_link menu_link';
}

export async function requestAssets(
  set: Dispatch<SetStateAction<Asset[]>>
): Promise<void> {
  const updated = await window.electron.getAssets();
  set(updated as Asset[]);
}
