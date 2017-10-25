import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElevatorComponent } from './elevator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ElevatorComponent],
  exports: [ElevatorComponent]
})
export class ElevatorModule {
}
