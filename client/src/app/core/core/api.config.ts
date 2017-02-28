export interface ApiConfigInterface {
  baseUrl: string;
  headerName: string;
  headerPrefix: string;
}

export class ApiConfig {
  public baseUrl: string;
  public headerName: string;
  public headerPrefix: string;

  constructor(config: ApiConfigInterface) {
    this.baseUrl = config.baseUrl || '';
    this.headerName = config.headerName || 'Authorization';
    this.headerPrefix = config.headerPrefix || 'Bearer';
  }
}
