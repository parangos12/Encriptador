import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropDescryptComponent } from './drag-and-drop-descrypt.component';

describe('DragAndDropDescryptComponent', () => {
  let component: DragAndDropDescryptComponent;
  let fixture: ComponentFixture<DragAndDropDescryptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropDescryptComponent]
    });
    fixture = TestBed.createComponent(DragAndDropDescryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
