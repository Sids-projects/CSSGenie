import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  ngOnInit() {
    this.disableZoom();
  }

  disableZoom() {
    // Disable zooming via mouse wheel with Ctrl
    document.addEventListener('wheel', this.preventZoom, { passive: false });
    // Disable zooming via keyboard shortcuts
    document.addEventListener('keydown', this.preventZoomKeys, false);
    // Disable pinch-to-zoom on touch devices
    document.addEventListener('touchstart', this.preventPinchZoom, {
      passive: false,
    });
    // Disable gesture zooming on touch devices
    document.addEventListener('gesturestart', this.preventZoom, false);
    document.addEventListener('gesturechange', this.preventZoom, false);
  }

  preventZoom(event: Event) {
    if ((event as WheelEvent).ctrlKey) {
      event.preventDefault();
    }
  }

  preventZoomKeys(event: KeyboardEvent) {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === '+' || event.key === '-' || event.key === '0')
    ) {
      event.preventDefault();
    }
    // For some browsers, using key codes may help
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.code === 'Equal' ||
        event.code === 'Minus' ||
        event.code === 'Digit0')
    ) {
      event.preventDefault();
    }
  }

  preventPinchZoom(event: TouchEvent) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }
}
