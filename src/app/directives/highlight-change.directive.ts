import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlightChange]',
  standalone: true
})
export class HighlightChangeDirective implements OnChanges {
  @Input('highlightChange') value!: number | string | null;
  private _prevValue: number | string | null = null;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this._prevValue !== null && this.value !== null) {
      if (typeof this.value === 'number' && typeof this._prevValue === 'number') {
        if (this.value > this._prevValue) {
          this._flash('animate-blink-green');
        } else if (this.value < this._prevValue) {
          this._flash('animate-blink-red');
        }
      } else if (this.value !== this._prevValue) {
        this._flash('animate-blink-blue');
      }
    }
    this._prevValue = this.value;
  }

  private _flash(animationClass: string) {
    this._renderer.addClass(this._el.nativeElement, animationClass);

    const duration = animationClass.includes('blue') ? 1500 * 3 : 500;
    setTimeout(() => {
      this._renderer.removeClass(this._el.nativeElement, animationClass);
    }, duration);
  }
}
