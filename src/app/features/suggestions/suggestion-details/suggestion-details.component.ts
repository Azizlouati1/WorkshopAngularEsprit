import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit, OnDestroy {

  suggestion!: Suggestion;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    // ✅ ÉCOUTE DES CHANGEMENTS D'ID DANS L'URL
    this.routeSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (!idParam || isNaN(+idParam)) {
        this.router.navigate(['/suggestions']);
        return;
      }

      const id = Number(idParam);

      this.suggestion = this.suggestionService
        .getSuggestions()
        .find(s => s.id === id)!;

      if (!this.suggestion) {
        alert('Suggestion non trouvée !');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  // ✅ SUGGESTION SUIVANTE
  goNext(): void {
    const suggestions = this.suggestionService.getSuggestions();
    const currentIndex = suggestions.findIndex(s => s.id === this.suggestion.id);

    if (currentIndex !== -1 && currentIndex < suggestions.length - 1) {
      const nextSuggestion = suggestions[currentIndex + 1];
      this.router.navigate(['/suggestions', nextSuggestion.id]);
    }
  }

  // ✅ SUGGESTION PRÉCÉDENTE
  goPrevious(): void {
    const suggestions = this.suggestionService.getSuggestions();
    const currentIndex = suggestions.findIndex(s => s.id === this.suggestion.id);

    if (currentIndex > 0) {
      const previousSuggestion = suggestions[currentIndex - 1];
      this.router.navigate(['/suggestions', previousSuggestion.id]);
    }
  }

  // ✅ Retour à la liste
  backToList() {
    this.router.navigate(['/suggestions']);
  }

  // ✅ Nettoyage mémoire
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
