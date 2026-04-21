import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GiphsService } from '../../services/giphs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {

  giphsService: GiphsService = inject(GiphsService);
  scrollStateService: ScrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv: HTMLDivElement | undefined = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState();
  }


  onScroll($event: Event) {
    const scrollDiv: HTMLDivElement | undefined = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop: number = scrollDiv.scrollTop;
    const clientHeight: number = scrollDiv.clientHeight;
    const scrollHeight: number = scrollDiv.scrollHeight;

    const isAtBottom: boolean = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.setTrendingScrollState(scrollTop);

    if (isAtBottom) {
      this.giphsService.loadTrendingGiphs();
    }
  }


}
