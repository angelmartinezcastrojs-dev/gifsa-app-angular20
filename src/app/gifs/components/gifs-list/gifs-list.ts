import { Component, Input } from '@angular/core';
import { GifsListItem } from "./gifs-list-item/gifs-list-item";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html',
})
export class GifsList {
  @Input() public gifs: Gif[] = [];
}
