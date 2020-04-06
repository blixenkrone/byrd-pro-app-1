import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StepperService } from '../shared.service';
import { IStoryResponse } from 'src/app/core/models/story.model';

/**
 * * This class clickevent add class depends on the imgselect directive
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  // template:
  //   `

  // `,
  styleUrls: ['./story.component.scss'],
})

export class StoryComponent implements OnInit {

  @Input() story!: IStoryResponse;

  constructor() { }

  ngOnInit() { }

}
