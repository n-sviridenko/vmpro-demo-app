import { bootloader } from '@angularclass/hmr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';
import { loadAsyncScripts } from './async-scripts';
import { getTranslationProviders } from './i18n-providers';

import 'app/style/common.scss';

const translationProviders = getTranslationProviders();
const compilerOptions = {
  providers: [
    ...translationProviders,
  ],
};

export function main(): Promise<any> {
  return loadAsyncScripts().then(
    () => platformBrowserDynamic().bootstrapModule(AppModule, compilerOptions)
  );
}

bootloader(main);
