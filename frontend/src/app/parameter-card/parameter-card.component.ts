import {Component, Input, OnInit} from '@angular/core';
import {ParameterCardSettings} from '../parameterCardSettings';

@Component({
  selector: 'app-parameter-card',
  templateUrl: './parameter-card.component.html',
  styleUrls: ['./parameter-card.component.css']
})
export class ParameterCardComponent implements OnInit {
  @Input() settings: ParameterCardSettings;
  isInfoDisplayed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
