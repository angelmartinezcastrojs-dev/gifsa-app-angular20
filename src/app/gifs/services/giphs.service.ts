import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GyphyResponse } from "../interfaces/giphy.interfaces";
import type { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.maper";
import { map, Observable, tap } from "rxjs";

const GIF_KEY = 'gifs';

const loadFromLoacalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs;
}

@Injectable({
    providedIn: 'root'
})
export class GiphsService {
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal<boolean>(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLoacalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    })

    loadTrendingGiphs(): void {
        this.http.get<GyphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
            }
        }).subscribe((response) => {
            const gifs = GifMapper.mapGiphyItemToGifArray(response.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        });
    }

    searchGiphs(query: string): Observable<Gif[]> {
        return this.http.get<any>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                limit: 20,
                api_key: environment.giphyApiKey,
                q: query,
            }
        }).pipe(
            // the map function is used to transform the response
            map(({ data }) => data), // destructuring
            map(item => GifMapper.mapGiphyItemToGifArray(item)), // mapping
            // TODO: Historial

            tap((items) => {
                this.searchHistory.update((history) => ({
                    ...history,
                    [query.toLocaleLowerCase()]: items,
                }));
            }),
        );
    }

    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}