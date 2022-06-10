import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tab-buttons',
  templateUrl: './tab-buttons.component.html',
  styleUrls: ['./tab-buttons.component.css']
})
export class TabButtonsComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() public next: EventEmitter<any> = new EventEmitter();
  @Output() public back: EventEmitter<any> = new EventEmitter();
  public sending = false;
  constructor(public op: CrudOperationService, public location: Location, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}
  
  submitForm() {
    this.next.emit();
  }

  cancelForm() {
    this.back.emit();
  }



}
