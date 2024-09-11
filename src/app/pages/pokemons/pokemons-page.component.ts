import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private title = inject(Title);
  private route = inject(ActivatedRoute);
  private pokemonsService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    // this.route.queryParamMap.pipe(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(
    () => {
      this.loadPokemons();
    },
    { allowSignalWrites: true }
  );

  loadPokemons() {
    const pageToLoad = this.currentPage()!;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`)))
      .subscribe((pokemons) => this.pokemons.set(pokemons));
  }
}
