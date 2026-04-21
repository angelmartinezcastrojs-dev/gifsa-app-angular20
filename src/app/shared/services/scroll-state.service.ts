import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrollStateService {

    private trendingScrollState = signal<number>(0);

    getTrendingScrollState(): number {
        return this.trendingScrollState();
    }

    setTrendingScrollState(scrollState: number): void {
        this.trendingScrollState.set(scrollState);
    }
}