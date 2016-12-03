import {
  Component, Input, HostBinding, HostListener, ElementRef,
  OnInit, OnChanges, AfterViewInit, Renderer
} from '@angular/core';

import { offset } from './elevator.utils';

@Component({
  selector: 'app-elevator',
  template: '<ng-content></ng-content>',
  styles: [':host { display: block; }'],
})
export class ElevatorComponent implements OnInit, OnChanges, AfterViewInit {
  lastPosition = 0;

  @Input() marginTop = 0;

  @Input() marginBottom = 0;

  @HostBinding('style.position') cssPosition;

  @HostBinding('style.top.px') cssTop;

  @HostBinding('style.bottom.px') cssBottom;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.marginTop = parseInt('' + this.marginTop, 10);

    this.marginBottom = parseInt('' + this.marginBottom, 10);

    Array.from(this.elevator.getElementsByTagName('img')).forEach(img => {
      this.renderer.listen(img, 'load', () => {
        this.reloadPositions(true);
      });
    });
  }

  ngOnChanges() {
    this.reloadPositions(true);
  }

  ngAfterViewInit() {
    this.reloadPositions(true);
  }

  @HostListener('window:scroll') @HostListener('window:resize') reloadTrigger() {
    this.reloadPositions();
  }

  reloadPositions(force = false) {
    this.reloadYPositions(force);
  }

  reloadYPositions(force = false) {
    let elevatorMarginTop = parseFloat(this.elevatorStyle.marginTop);
    let elevatorMarginBottom = parseFloat(this.elevatorStyle.marginBottom);

    let elevatorHeight = this.elevator.offsetHeight + elevatorMarginTop + elevatorMarginBottom;

    if (elevatorHeight >= this.host.clientHeight) {
      this.setPosition();

      return;
    }

    let isScrollDown = window.scrollY > this.lastPosition;

    this.lastPosition = window.scrollY;

    let elevatorDiff = (window.innerHeight - (elevatorHeight + this.marginTop + this.marginBottom));

    let hostPosition = this.host.getBoundingClientRect();

    let hostTop = (hostPosition.top * -1) + this.marginTop;

    let hostBottom = (hostPosition.bottom - window.innerHeight) + this.marginBottom;

    let elevatorPosition = this.elevator.getBoundingClientRect();

    let elevatorTop = (elevatorPosition.top * -1) + elevatorMarginTop + this.marginTop;

    let elevatorBottom = (elevatorPosition.bottom - window.innerHeight) + elevatorMarginBottom + this.marginBottom;

    if (elevatorDiff >= 0 ? hostTop <= 0 : elevatorBottom > 0 && (!this.cssPosition || hostTop <= 0)) {
      this.setPosition();
    } else {
      if (elevatorDiff >= 0) {
        if (hostBottom + elevatorDiff <= 0) {
          this.setPosition('absolute', null, 0);
        } else {
          this.setPosition('fixed', this.marginTop);
        }
      } else {
        this.setPosition('absolute', offset(this.elevator).top - offset(this.host).top - elevatorMarginTop);

        if (isScrollDown || force) {
          if (hostBottom <= 0) {
            this.setPosition('absolute', null, 0);
          } else if (elevatorBottom <= 0) {
            this.setPosition('fixed', null, this.marginBottom);
          }
        } else {
          if (elevatorTop <= 0) {
            this.setPosition('fixed', this.marginTop, null);
          }
        }
      }
    }
  }

  get elevator() {
    return this.elementRef.nativeElement;
  }

  get elevatorStyle() {
    return this.elevator.currentStyle || window.getComputedStyle(this.elevator);
  }

  get host() {
    return this.elevator.parentNode;
  }

  setPosition(position = null, top = null, bottom = null) {
    this.cssPosition = position;
    this.cssTop = top;
    this.cssBottom = bottom;
  }
}
