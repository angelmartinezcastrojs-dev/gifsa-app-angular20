import { Component, inject, signal } from '@angular/core';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GiphsService } from '../../services/giphs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.maper';

@Component({
  selector: 'app-search-page',
  imports: [GifsList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  giphsService = inject(GiphsService);
  gifs = signal<Gif[]>([]);


  onSearch(query: string) {
    if (query.trim().length === 0) return;

    this.giphsService.searchGiphs(query).subscribe((response) => {
      this.gifs.set(response);
    });
  }
}
