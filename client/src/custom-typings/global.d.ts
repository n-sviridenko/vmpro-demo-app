// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var HMR: boolean;

declare var API_BASE_URL: string;

interface GlobalEnvironment {
  ENV;
  HMR;

  API_BASE_URL;
}
