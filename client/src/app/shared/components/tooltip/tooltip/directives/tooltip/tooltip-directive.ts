import {
	ChangeDetectorRef,
	ComponentRef,
	Directive,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	ViewContainerRef,
} from '@angular/core';
import {TooltipComponent} from './tooltip.component';
import {TooltipPosition} from './tooltip.enum';
import {TooltipSettings} from './tooltip.interface';

@Directive({
	selector: '[appTooltip]',
	standalone: true,
})
export class TooltipDirective implements OnDestroy {
	@Input() appTooltip: TooltipSettings | null = null;

	private componentRef: ComponentRef<any> | null = null;
	private showTimeout?: number;
	private hideTimeout?: number;

	constructor(
		private elementRef: ElementRef,
		private viewContainerRef: ViewContainerRef,
		private cd: ChangeDetectorRef
	) {}

	@HostListener('mouseenter')
	onMouseEnter(): void {
		this.initializeTooltip();
	}

	@HostListener('mouseleave')
	onMouseLeave(): void {
		this.setHideTooltipTimeout();
	}

	private initializeTooltip(): void {
		if (this.componentRef === null) {
			window.clearInterval(this.appTooltip?.hideDelay);

			this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
			this.setTooltipComponentProperties();

			this.showTimeout = window.setTimeout(
				() => this.showTooltip(),
				this.appTooltip?.showDelay
			);
		}
	}

	private setTooltipComponentProperties(): void {
		if (this.componentRef !== null) {
			this.componentRef.instance.tooltip.title = this.appTooltip?.title;
			this.componentRef.instance.tooltip.position = this.appTooltip?.position;
			this.componentRef.instance.tooltip.theme = this.appTooltip?.theme;

			const {left, right, top, bottom} =
				this.elementRef.nativeElement.getBoundingClientRect();

			switch (this.appTooltip?.position) {
				case TooltipPosition.BELOW: {
					this.componentRef.instance.tooltip.left = Math.round((right - left) / 2 + left);
					this.componentRef.instance.tooltip.top = Math.round(bottom);
					break;
				}
				case TooltipPosition.ABOVE: {
					this.componentRef.instance.tooltip.left = Math.round((right - left) / 2 + left);
					this.componentRef.instance.tooltip.top = Math.round(top);
					break;
				}
				case TooltipPosition.RIGHT: {
					this.componentRef.instance.tooltip.left = Math.round(right);
					this.componentRef.instance.tooltip.top = Math.round(top + (bottom - top) / 2);
					break;
				}
				case TooltipPosition.LEFT: {
					this.componentRef.instance.tooltip.left = Math.round(left);
					this.componentRef.instance.tooltip.top = Math.round(top + (bottom - top) / 2);
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	private showTooltip(): void {
		if (this.componentRef !== null) {
			this.componentRef.instance.tooltip.visible = true;
			this.cd.markForCheck();
		}
	}

	private setHideTooltipTimeout(): void {
		this.hideTimeout = window.setTimeout(() => this.destroy(), this.appTooltip?.hideDelay);
	}

	ngOnDestroy(): void {
		this.destroy();
	}

	private destroy(): void {
		if (this.componentRef !== null) {
			window.clearInterval(this.showTimeout);
			window.clearInterval(this.appTooltip?.hideDelay);
			this.componentRef.destroy();
			this.componentRef = null;
		}
	}
}
