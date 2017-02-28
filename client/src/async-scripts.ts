const loadIntl = (resolve) => {
  if (global.Intl) {
    resolve();
  } else {
    (require as any).ensure([], function (require) {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/ru.js');
      require('intl/locale-data/jsonp/fr.js');

      resolve();
    });
  }
};

export function loadAsyncScripts(): Promise<any> {
  return new Promise(loadIntl);
}
