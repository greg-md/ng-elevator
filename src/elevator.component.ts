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
  selector: 'elevator',
  template: '<ng-content></ng-content>',
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElevatorComponent implements AfterViewInit {
  lastPosition: number = 0;

  private _marginTop: number = 0;

  @Input('margin-top')
  set marginTop(position: number) {
    this._marginTop = Math.round(position);
  };

  get marginTop(): number {
    return this._marginTop;
  }

  private _marginBottom: number = 0;

  @Input('margin-bottom')
  set marginBottom(position: number) {
    this._marginBottom = Math.round(position);
  };

  get marginBottom(): number {
    return this._marginBottom;
  }

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
      let loadUnload = this.renderer.listen(img, 'load', () => {
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
    let styles = getComputedStyle(this.elementRef.nativeElement);

    let elevatorMarginTop = parseFloat(styles.marginTop);
    let elevatorMarginBottom = parseFloat(styles.marginBottom);

    let elevatorHeight = this.elementRef.nativeElement.offsetHeight + elevatorMarginTop + elevatorMarginBottom;

    if (elevatorHeight >= this.elementRef.nativeElement.parentNode.clientHeight) {
      this.setPosition();

      return;
    }

    let isScrollDown = window.scrollY > this.lastPosition;

    this.lastPosition = window.scrollY;

    let elevatorDiff = (window.innerHeight - (elevatorHeight + this.marginTop + this.marginBottom));

    let hostPosition = this.elementRef.nativeElement.parentNode.getBoundingClientRect();

    let hostTop = (hostPosition.top * -1) + this.marginTop;

    let hostBottom = (hostPosition.bottom - window.innerHeight) + this.marginBottom;

    let elevatorPosition = this.elementRef.nativeElement.getBoundingClientRect();

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
        this.setPosition('absolute', offset(this.elementRef.nativeElement).top - offset(this.elementRef.nativeElement.parentNode).top - elevatorMarginTop);

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
    let styles = getComputedStyle(this.elementRef.nativeElement);

    let elevatorMarginTop = parseFloat(styles.marginTop);

    this.setPosition('absolute', offset(this.elementRef.nativeElement).top - offset(this.elementRef.nativeElement.parentNode).top - elevatorMarginTop);
  }

  setPosition(position: string = null, top: number = null, bottom: number = null) {
    this.cssPosition = position;
    this.cssTop = top;
    this.cssBottom = bottom;
  }
}
