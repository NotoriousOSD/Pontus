import {Component, OnInit} from '@angular/core';
import { Entry} from '../entry';
import { EntryService} from '../entry.service';
import { Location } from '@angular/common';
import {ParameterCardSettings} from '../parameterCardSettings';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  mainEntry: Entry;
  isExistingEntry: boolean;
  errorMessage: string = null;
  public entryDate = null;
  public entryTime = null;
  phCardSettings: ParameterCardSettings = {
    title: 'pH',
    expansionContent: [
      'fill test tube w/ 5ml of water',
      'add 3 drops of pH solution',
      'invert tube several times',
      'compare color against color chart',
    ],
    timers: []
  };
  ghAndKhCardSettings: ParameterCardSettings = {
    title: 'gH & kH',
    expansionContent: [
      'fill test tube w/ 5ml of water',
      'add one drop, keep count of drops',
      'invert tube several times',
      'gH: continue until orange turns to green',
      'kH: continue until blue turns to yellow',
      'drop:ppm | 1:17.9',
    ],
    timers: []
  };
  ammoniaCardSettings: ParameterCardSettings = {
    title: 'ammonia',
    expansionContent: [
      'fill test tube w/ 5ml of water',
      'add 8 drops of ammonia solution #1',
      'add 8 drops of ammonia solution #2',
      'shake tube vigorously for 5 seconds',
      'let sit for 5 minutes',
      'compare color against color chart',
    ],
    timers: [
      {title: 'let solution sit', duration: 300}
    ]
  };
  nitritesCardSettings: ParameterCardSettings = {
    title: 'nitrites',
    expansionContent: [
      'fill test tube w/ 5ml of water',
      'add 5 drops of nitrite solution',
      'shake tube for 5 seconds',
      'let sit for 5 minutes',
      'compare color against color chart',
    ],
    timers: [
      {title: 'let solution sit', duration: 300}
    ]
  };
  nitratesCardSettings: ParameterCardSettings = {
    title: 'nitrates',
    expansionContent: [
      'fill test tube w/ 5ml of water',
      'add 10 drops of nitrate solution #1',
      'invert tube several times',
      'shake nitrate solution #2 vigorously for 30 seconds',
      'add 10 drops of nitrate solution #2',
      'shake tube vigorously for 60 seconds',
      'let sit for 5 minutes',
      'compare color against color chart',
    ],
    timers: [
      {title: 'shake test tube', duration: 30},
      {title: 'shake nitrate solution #2', duration: 60},
      {title: 'let solution sit', duration: 300}
    ]
  };
  constructor(
    private entryService: EntryService,
    private location: Location
  ) {}
  submitEntry(): void {
    if (!this.checkRequiredFields()) {
      return;
    }
    const formedDate = new Date(this.entryDate.toDateString() + ' ' + this.entryTime);
    if (isNaN(formedDate.getTime())) { // is invalid date
      console.log('Did not attempt to submit item without valid date.');
      this.goBack();
      return;
    }
    if (this.mainEntry.notes)
      this.mainEntry.notes = this.mainEntry.notes.replace(/\n/g, '<br>');
    this.mainEntry.date = formedDate;
    this.entryService.addEntry(this.mainEntry)
      .subscribe(() => this.goBack());
  }
  updateEntry(): void {
    if (!this.checkRequiredFields()) {
      return;
    }
    const formedDate = new Date(this.entryDate + ' ' + this.entryTime);
    if (isNaN(formedDate.getTime())) { // is invalid date
      console.log('Did not attempt to submit item without valid date.');
      this.goBack();
      return;
    }
    if (this.mainEntry.notes)
      this.mainEntry.notes = this.mainEntry.notes.replace(/\n/g, '<br>');
    this.mainEntry.date = formedDate;
    this.entryService.updateEntry(this.mainEntry)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
  setTimeToNow(): void {
    this.entryDate = new Date(Date.now());
    this.entryTime = new Date(Date.now()).toTimeString().substring(0, 5);
  }
  setTimeAndDateFromEntry(): void {
    this.entryDate = new Date(this.mainEntry.date).toJSON().substring(0, 10);
    this.entryTime = new Date(this.mainEntry.date).toTimeString().substring(0, 5);
  }
  checkRequiredFields(): boolean {
    const isValidEntry = (this.entryDate && this.entryTime);
    if (!isValidEntry) {
      this.errorMessage = 'date & time must be filled';
    }
    return isValidEntry;
  }
  ngOnInit(): void {
    console.log(window.history.state.data);
    if (!window.history.state.data) {
      this.isExistingEntry = false;
      this.setTimeToNow();
      this.mainEntry = {
        date: null, _id: null, ph: null, gh: null, kh: null,
        ammonia: null, nitrites: null, nitrates: null, notes: null
      };
    } else {
      this.mainEntry = window.history.state.data.entryToUpdate;
      this.isExistingEntry = true;
      this.setTimeAndDateFromEntry();
    }
  }

}
