import { Component, OnInit } from '@angular/core';
// import dynamic-render component
import { DynamicRenderComponent } from './dynamic-render/dynamic-render.component';
declare var require: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yz12142';
  public metaData!: any[];
  public isDisabled = true;
  // import metaData from assets
  constructor() { }

  ngOnInit() {
    // create dynamic component
    const dynamicComponent = new DynamicRenderComponent();
    this.metaData = require('../assets/metaData.json')?.modal || [];
    // sort metaData by order, if order is not defined, set it to 10000
    this.metaData.sort((a, b) => (a.order || 10000) - (b.order || 10000));
    console.log(this.metaData);
  }

  submit() {
    // console log medata component value as an array
    console.log(this.metaData.map((each) => {
      return each.components.map((component: any) => {
        return component.value;
      })
    }));

  }

  checkSubmitEnabled() {
    // check if all components have value
    const valueArray = this.metaData.map((each) => {
      return each.components.map((component: any) => {
        return component.value;
      })
    });
    // check if valueArray has empty or undefined value
    this.isDisabled = valueArray.some((each) => {
      return each.some((value: any) => {
        return !value;
      })
    });
    console.log(this.isDisabled);
  }

}
