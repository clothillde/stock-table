import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
    @Input() message = 'An error occurred';
}
