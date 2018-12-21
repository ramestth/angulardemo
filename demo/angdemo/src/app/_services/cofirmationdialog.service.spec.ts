import { TestBed, inject } from '@angular/core/testing';

import { CofirmationdialogService } from './cofirmationdialog.service';

describe('CofirmationdialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CofirmationdialogService]
    });
  });

  it('should be created', inject([CofirmationdialogService], (service: CofirmationdialogService) => {
    expect(service).toBeTruthy();
  }));
});
