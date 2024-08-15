import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWebhookComponent } from './new-webhook.component';

describe('NewWebhookComponent', () => {
  let component: NewWebhookComponent;
  let fixture: ComponentFixture<NewWebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWebhookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
