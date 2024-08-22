import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type GlobalNavigationBarType = 'home' | 'search' | 'ditto' | 'my' | undefined;

export type GNBItemDataType = {
  name: string;
  route: string;
  icon: IconDefinition;
};
