import { Observable } from 'rxjs';

export abstract class AbstractLoadable<T> {
  public data: T;

  public error;

  public loading: boolean = false;

  public loaded: boolean = false;

  public load() {
    this.beforeLoad();

    this.error = null;
    this.loaded = false;
    this.loading = true;

    Observable.of(null)
      .mergeMap(() => this.getDataSource())
      .finally(() => {
        this.loading = false;
      })
      .subscribe(
        (data: T) => {
          this.data = data;
          this.loaded = true;

          this.onLoad(data);
        },
        (error) => {
          this.error = error;

          this.onError(error);
        }
      )
    ;
  }

  protected abstract getDataSource(): Observable<T>;

  protected beforeLoad() {} // tslint:disable-line

  protected onLoad(data: T) {} // tslint:disable-line

  protected onError(error) {} // tslint:disable-line
}
