import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-registro',
  templateUrl: './header-registro.component.html',
  styleUrls: ['./header-registro.component.scss'],
})
export class HeaderRegistroComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();

  goBack() {
    this.onBack.emit();
  }

}
