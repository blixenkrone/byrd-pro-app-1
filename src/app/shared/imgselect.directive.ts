import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgselect]'
})
export class ImgselectDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseover', ['$event'])
  onHover() { }

  @HostListener('click', ['$event'])
  onClick() {
    const img: DOMTokenList = this.el.nativeElement.firstChild.classList;
    this.addSelectedClass(img)
  }

  private addSelectedClass = (imgDom: DOMTokenList) => {
    const imgClass = 'img-selected';
    imgDom.contains(imgClass)
      ? imgDom.remove(imgClass)
      : imgDom.add(imgClass)
  }
}
