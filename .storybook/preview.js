import { addDecorator, addParameters } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withA11y } from '@storybook/addon-a11y';
import { SuspenseDecorator } from './decorators';
import theme from './theme';
import i18n from './i18n';

i18n();
addDecorator(SuspenseDecorator);
addDecorator(withA11y);
addDecorator(centered);

addParameters({
  options: {
    theme: theme,
  },
});