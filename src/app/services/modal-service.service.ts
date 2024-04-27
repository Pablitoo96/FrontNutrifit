import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}