import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { DebugElement, Component, Input, Output, EventEmitter } from '@angular/core';

import { LoadableComponent } from './loadable.component';

@Component({
  template: `
    <c-loadable
      [loading]="loading"
      [error]="error"
      [allowReload]="allowReload"
      (reload)="doReload()"
    >
      <div id="content"></div>
    </c-loadable>
  `
})
class TestHostComponent {
  @Input()
  public loading: boolean;

  @Input()
  public error: any;

  @Input()
  public allowReload: boolean = false;

  @Output()
  public reload = new EventEmitter<any>();

  public doReload() {
    this.reload.emit();
  }
}

describe('LoadableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: LoadableComponent;
  let loadingBar: DebugElement;
  let errorMessage: DebugElement;
  let reloadBtn: DebugElement;
  let content: DebugElement;
  let reloadSpy: jasmine.Spy;

  function reloadDebugElements() {
    fixture.detectChanges();

    loadingBar = fixture.debugElement.query(By.css('.fa-spinner'));
    errorMessage = fixture.debugElement.query(By.css('span.text-danger'));
    reloadBtn = fixture.debugElement.query(By.css('button.btn-link'));
    content = fixture.debugElement.query(By.css('#content'));
  }

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        // imports: [SharedModule],
        declarations: [
          LoadableComponent,
          TestHostComponent,
        ],
      })
      .compileComponents()
    ;
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    reloadSpy = spyOn(comp.reload, 'emit');

    fixture.detectChanges();
  }));

  it('should display content', () => {
    comp.loading = false;

    reloadDebugElements();

    expect(loadingBar).toBeNull();
    expect(errorMessage).toBeNull();
    expect(reloadBtn).toBeNull();
    expect(content).not.toBeNull();
  });

  it('should display loading bar', () => {
    comp.loading = true;

    reloadDebugElements();

    expect(loadingBar).not.toBeNull();
    expect(errorMessage).toBeNull();
    expect(reloadBtn).toBeNull();
    expect(content).toBeNull();
  });

  it('should display error message', () => {
    comp.error = 'Some error';
    comp.loading = false;

    reloadDebugElements();

    expect(loadingBar).toBeNull();
    expect(errorMessage).not.toBeNull();
    expect(reloadBtn).toBeNull();
    expect(content).toBeNull();
  });

  it('should display reload button', () => {
    comp.error = 'Some error';
    comp.loading = false;
    comp.allowReload = true;

    reloadDebugElements();

    expect(loadingBar).toBeNull();
    expect(errorMessage).not.toBeNull();
    expect(reloadBtn).not.toBeNull();
    expect(content).toBeNull();
  });
});
