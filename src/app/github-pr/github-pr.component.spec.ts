import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubPRComponent } from './github-pr.component';

describe('GithubPRComponent', () => {
  let component: GithubPRComponent;
  let fixture: ComponentFixture<GithubPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
