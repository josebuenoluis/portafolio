import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBlogComponent } from './panel-blog.component';

describe('PanelBlogComponent', () => {
  let component: PanelBlogComponent;
  let fixture: ComponentFixture<PanelBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
