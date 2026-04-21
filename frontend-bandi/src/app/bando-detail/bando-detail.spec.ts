import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandoDetail } from './bando-detail';

describe('BandoDetail', () => {
  let component: BandoDetail;
  let fixture: ComponentFixture<BandoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandoDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BandoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
