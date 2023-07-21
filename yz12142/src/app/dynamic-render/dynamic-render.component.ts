import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-render',
  templateUrl: './dynamic-render.component.html',
  styleUrls: ['./dynamic-render.component.scss']
})
export class DynamicRenderComponent implements OnInit {
  // accept input from parent component called component
  @Input() components: any[] | undefined;
  @Output() componentsChange: EventEmitter<any[]> = new EventEmitter<any[]>();


  constructor() { }

  ngOnInit(): void {
    // sort components by order, if order is not defined, set it to 10000
    this.components?.sort((a, b) => (a.order || 10000) - (b.order || 10000));
    console.log(this.components);
  }

  setValue(event: any, component: any) {
    if (this.rulesCheck(event.target.value, component)) {
      component.value = event.target.value;
    } else {
      component.value = '';
    }
    this.componentsChange.emit(this.components);
  }

  rulesCheck(value: any, component: any) {
    console.log(value);
    // if required is true, then check if value is empty
    if (component.required && !value) {
      return false;
    }
    if (value.length > component?.rule?.maxLength) {
      return false;
    }
    return true;
  }
}
