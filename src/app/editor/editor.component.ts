import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  btnForm!: FormGroup;
  btnName: string = 'Click';
  editWidthHeight: boolean = false;
  editPadding: boolean = false;
  editRadius: boolean = false;
  showToolsKey: string = 'Text';
  changes: any = {};

  customizeKey: boolean = true;
  componentsKey: boolean = false;

  dragItems = [
    { title: 'Button', class: 'btnView', content: 'Button' },
    { title: 'Input', class: 'impView', content: 'Input' },
  ];
  droppedItems: any[] = [];

  ngOnInit() {
    this.btnForm = new FormGroup({
      buttonName: new FormControl('Click'),
      fontSize: new FormControl(16),
      fontWeight: new FormControl(400),
      // Width Height
      widthToggle: new FormControl(false),
      width: new FormControl('auto'),
      height: new FormControl('auto'),
      // Padding
      paddingToggle: new FormControl(false),
      padding: new FormControl(0),
      paddingTop: new FormControl(0),
      paddingRight: new FormControl(0),
      paddingBottom: new FormControl(0),
      paddingLeft: new FormControl(0),
      // Colour
      backgroundColor: new FormControl('white'),
      textColor: new FormControl('black'),
      // Border Radius
      radiusToggle: new FormControl(false),
      radius: new FormControl(0),
      radiusLTop: new FormControl(0),
      radiusRTop: new FormControl(0),
      radiusRBottom: new FormControl(0),
      radiusLBottom: new FormControl(0),
      // Border
      borderWidth: new FormControl(2),
      borderStyle: new FormControl('solid'),
      borderColor: new FormControl('black'),
    });

    this.makeChanges();
  }

  makeChanges() {
    this.btnName = this.btnForm.get('buttonName')?.value;
    let widthToggle = this.btnForm.get('widthToggle')?.value;
    let paddingToggle = this.btnForm.get('paddingToggle')?.value;
    let radiusToggle = this.btnForm.get('radiusToggle')?.value;

    if (widthToggle === true) {
      this.editWidthHeight = true;
    } else if (widthToggle === false) {
      this.editWidthHeight = false;
      this.btnForm.patchValue({
        width: 'auto',
        height: 'auto',
      });
    }

    if (paddingToggle === true) {
      this.editPadding = true;
    } else if (paddingToggle === false) {
      this.editPadding = false;
      let equalPadding = this.btnForm.get('padding')?.value;
      this.btnForm.patchValue({
        paddingTop: equalPadding,
        paddingRight: equalPadding,
        paddingBottom: equalPadding,
        paddingLeft: equalPadding,
      });
    }

    if (radiusToggle === true) {
      this.editRadius = true;
    } else if (radiusToggle === false) {
      this.editRadius = false;
      let equalRadius = this.btnForm.get('radius')?.value;
      this.btnForm.patchValue({
        radiusLTop: equalRadius,
        radiusRTop: equalRadius,
        radiusRBottom: equalRadius,
        radiusLBottom: equalRadius,
      });
    }

    this.changes = {
      'font-size': `${this.btnForm.get('fontSize')?.value}px`,
      'font-weight': `${this.btnForm.get('fontWeight')?.value}`,
      width:
        this.btnForm.get('width')?.value === 'auto'
          ? 'auto'
          : `${this.btnForm.get('width')?.value}px`,
      height:
        this.btnForm.get('height')?.value === 'auto'
          ? 'auto'
          : `${this.btnForm.get('height')?.value}px`,
      padding:
        this.btnForm.get('paddingToggle')?.value === true
          ? `${this.btnForm.get('paddingTop')?.value}px 
      ${this.btnForm.get('paddingRight')?.value}px 
      ${this.btnForm.get('paddingBottom')?.value}px 
      ${this.btnForm.get('paddingLeft')?.value}px`
          : `${this.btnForm.get('padding')?.value}px
      ${this.btnForm.get('padding')?.value}px
      ${this.btnForm.get('padding')?.value}px
      ${this.btnForm.get('padding')?.value}px`,
      'background-color': `${this.btnForm.get('backgroundColor')?.value}`,
      color: `${this.btnForm.get('textColor')?.value}`,
      'border-radius':
        this.btnForm.get('radiusToggle')?.value === true
          ? `${this.btnForm.get('radiusLTop')?.value}px
      ${this.btnForm.get('radiusRTop')?.value}px
      ${this.btnForm.get('radiusRBottom')?.value}px
      ${this.btnForm.get('radiusLBottom')?.value}px`
          : `${this.btnForm.get('radius')?.value}px
      ${this.btnForm.get('radius')?.value}px
      ${this.btnForm.get('radius')?.value}px
      ${this.btnForm.get('radius')?.value}px`,
      'border-width': `${this.btnForm.get('borderWidth')?.value}px`,
      'border-style': `${this.btnForm.get('borderStyle')?.value}`,
      'border-color': `${this.btnForm.get('borderColor')?.value}`,
    };
  }

  showTools(param: string) {
    this.showToolsKey = param;
  }

  drop(event: CdkDragDrop<any[]>, listType: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  sortPredicate(index: number, item: CdkDrag<number>) {
    return (index + 1) % 2 === item.data % 2;
  }

  customize() {
    this.customizeKey = true;
    this.componentsKey = false;
  }

  components() {
    this.customizeKey = false;
    this.componentsKey = true;
  }
}
