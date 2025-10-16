import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[appHighlightChange]',
    standalone: true,
})
export class HighlightChangeDirective implements OnChanges {
    @Input('appHighlightChange') value!: number | string | null;
    private _prevValue: number | string | null = null;
    private _el: ElementRef = inject(ElementRef);

    ngOnChanges(): void {
        if (this._prevValue === null || this.value === null) {
            this._prevValue = this.value;
            return;
        }

        let animationClass: string | null = null;

        if (typeof this.value === 'number' && typeof this._prevValue === 'number') {
            if (this.value > this._prevValue) animationClass = 'animate-blink-green';
            else if (this.value < this._prevValue) animationClass = 'animate-blink-red';
        } else if (this.value !== this._prevValue) {
            animationClass = 'animate-blink-blue';
        }

        if (animationClass) {
            this._el.nativeElement.classList.add(animationClass);
            const duration = animationClass.includes('blue') ? 4500 : 500;
            setTimeout(() => this._el.nativeElement.classList.remove(animationClass), duration);
        }

        this._prevValue = this.value;
    }
}
