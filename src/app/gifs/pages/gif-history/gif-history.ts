import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GiphsService } from '../../services/giphs.service';
import { GifsList } from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-gif-history',
  imports: [GifsList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  // query = inject(ActivatedRoute).params.subscribe(
  //   params => console.log({ params })
  // );

  private giphsService = inject(GiphsService);

  // convert observable to signal
  query = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['query'])));

  gifs = computed(() => this.giphsService.getHistoryGifs(this.query()));

}


