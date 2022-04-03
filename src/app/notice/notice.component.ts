import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  @Input() error!: boolean;
  @Output() noticeStatus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public closeNotice() {
    this.noticeStatus.emit(false);
  }

}
