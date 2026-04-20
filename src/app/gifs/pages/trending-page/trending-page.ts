import { Component, inject } from '@angular/core';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GiphsService } from '../../services/giphs.service';


@Component({
  selector: 'app-trending-page',
  imports: [GifsList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {

  giphsService = inject(GiphsService);

  constructor() {
    this.giphsService.loadTrendingGiphs();
  }


}
