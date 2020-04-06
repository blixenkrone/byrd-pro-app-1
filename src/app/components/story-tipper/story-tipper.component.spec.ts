import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTipperComponent } from './story-tipper.component';

describe('StoryTipperComponent', () => {
  let component: StoryTipperComponent;
  let fixture: ComponentFixture<StoryTipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryTipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
