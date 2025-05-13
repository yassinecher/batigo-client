import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsClientComponent } from './products-client.component';

describe('ProductsClientComponent', () => {
  let component: ProductsClientComponent;
  let fixture: ComponentFixture<ProductsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsClientComponent]
    });
    fixture = TestBed.createComponent(ProductsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
