import { Component, OnInit } from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';

import { Entry } from '../entry';
import { EntryService} from '../entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EntriesComponent implements OnInit {

  entries: Entry[];
  columnsToDisplay = ['date', 'ph', 'gh', 'kh', 'ammonia', 'nitrites', 'nitrates'];
  expandedEntry: Entry | null;

  constructor(
    private entryService: EntryService
  ) { }
  getEntries(): void {
    this.entryService.getEntries()
      .subscribe(entries => {
        console.log(entries);
        this.entries = entries;
      });
  }
  refreshEntries(): void {
    this.getEntries();
  }
  delete(entry: Entry): void {
    this.entryService.deleteEntry(entry)
      .subscribe(() => {
        this.refreshEntries();
      });
  }
  ngOnInit(): void {
    this.getEntries();
  }

}
