import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, AfterViewInit {
  @Input() timerDuration: number;
  @Input() timerLabel: string;
  @ViewChild(MatRipple) ripple: MatRipple;
  initialTimerDuration: number;
  minutes;
  seconds;
  isCounting = false;
  isExpired = false;
  countdownDate;
  timerInterval;
  constructor() { }
  addPrecedingZeroToInput(inputElement): void {
    if (!inputElement.value) {
      return;
    }
    this.isExpired = false;
    console.log(typeof inputElement.value);
    if (inputElement.value.length < 2) {
      inputElement.value = this.addPrecedingZero(inputElement.value);
    }
  }
  addPrecedingZero(value: number): string {
    return value < 10 ?
      '0' + value :
      '' + value;
  }
  updateTimerDuration(): void {
    this.timerDuration = +this.seconds + (+this.minutes * 60);
  }
  updateMinutesAndSeconds(): void {
    this.minutes = this.addPrecedingZero(Math.floor(this.timerDuration / 60));
    this.seconds = this.addPrecedingZero(this.timerDuration % 60);
  }
  countdownOperation(): void {
    const now = new Date().getTime();
    let difference = this.countdownDate - now;
    if (difference <= 0) {
      this.ripple.launch({centered: true});
      if (!this.isExpired) {
        this.isExpired = true;
      }
      if (difference >= 600000) {
        this.stopTimer();
      }
      difference = Math.abs(difference);
    }
    this.minutes = this.addPrecedingZero(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds = this.addPrecedingZero(
      Math.floor((difference % (1000 * 60)) / 1000));
  }
  startTimer(): void {
    if (this.isCounting) { return; }
    this.isCounting = true;
    this.updateTimerDuration();
    const newCountdownDate = new Date(Date.now());
    // Add one extra second because setInterval fires immediately
    this.countdownDate = newCountdownDate.setSeconds(
      newCountdownDate.getSeconds() + this.timerDuration + 1).valueOf();
    this.timerInterval = setInterval(this.countdownOperation.bind(this), 1000);
  }
  stopTimer(): void {
    if (!this.isCounting) { return; }
    clearInterval(this.timerInterval);
    this.isCounting = false;
  }
  resetTimer(): void {
    this.stopTimer();
    this.timerDuration = this.initialTimerDuration;
    this.updateMinutesAndSeconds();
    this.isExpired = false;
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.initialTimerDuration = this.timerDuration;
    this.updateMinutesAndSeconds();
  }

}
