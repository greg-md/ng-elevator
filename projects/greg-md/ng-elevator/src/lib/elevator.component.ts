import {
  Component,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { offset } from './elevator.utils';

@Component({
  selector: 'greg-elevator',
  template: '<ng-content></ng-content>',
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElevatorComponent implements AfterViewInit {
  lastPosition = 0;

  @Input() marginTop = 0;
  @Input() marginBottom = 0;

  @HostBinding('style.position') cssPosition: string;

  @HostBinding('style.top.px') cssTop: number;

  @HostBinding('style.bottom.px') cssBottom: number;

  @ViewChildren('img') images: QueryList<any>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
  }

  ngAfterViewInit() {
    this.initImagesLoad();

    setTimeout(() => this.reloadPositions(true));
  }

  @HostListener('window:scroll')
  windowScroll() {
    this.reloadPositions();
  }

  @HostListener('window:resize')
  windowResize() {
    this.reloadPositions(true);
  }

  initImagesLoad() {
    this.images.forEach(img => {
      const loadUnload = this.renderer.listen(img, 'load', () => {
        this.reloadPositions(true);

        loadUnload();
      });
    });
  }

  reloadPositions(keepPositions = false) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.reloadYPositions(keepPositions);
  }

  reloadYPositions(keepPositions = false) {
    const styles = getComputedStyle(this.elementRef.nativeElement);

    const elevatorMarginTop = parseFloat(styles.marginTop);
    const elevatorMarginBottom = parseFloat(styles.marginBottom);

    const elevatorHeight = this.elementRef.nativeElement.offsetHeight + elevatorMarginTop + elevatorMarginBottom;

    if (elevatorHeight >= this.elementRef.nativeElement.parentNode.clientHeight) {
      this.setPosition();

      return;
    }

    const isScrollDown = window.scrollY > this.lastPosition;

    this.lastPosition = window.scrollY;

    const elevatorDiff = (window.innerHeight - (elevatorHeight + this.marginTop + this.marginBottom));

    const hostPosition = this.elementRef.nativeElement.parentNode.getBoundingClientRect();

    const hostTop = (hostPosition.top * -1) + this.marginTop;

    const hostBottom = (hostPosition.bottom - window.innerHeight) + this.marginBottom;

    const elevatorPosition = this.elementRef.nativeElement.getBoundingClientRect();

    const elevatorTop = (elevatorPosition.top * -1) + elevatorMarginTop + this.marginTop;

    const elevatorBottom = (elevatorPosition.bottom - window.innerHeight) + elevatorMarginBottom + this.marginBottom;

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
        this.setPosition(
          'absolute',
          offset(this.elementRef.nativeElement).top - offset(this.elementRef.nativeElement.parentNode).top - elevatorMarginTop
        );

        if (isScrollDown || keepPositions) {
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

  prepareAbsolutePositions() {
    const styles = getComputedStyle(this.elementRef.nativeElement);

    const elevatorMarginTop = parseFloat(styles.marginTop);

    this.setPosition(
      'absolute',
      offset(this.elementRef.nativeElement).top - offset(this.elementRef.nativeElement.parentNode).top - elevatorMarginTop
    );
  }

  setPosition(position: string = null, top: number = null, bottom: number = null) {
    this.cssPosition = position;
    this.cssTop = top;
    this.cssBottom = bottom;
  }
}
