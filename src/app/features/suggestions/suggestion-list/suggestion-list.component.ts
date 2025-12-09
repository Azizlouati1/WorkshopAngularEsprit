import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.css',
  encapsulation: ViewEncapsulation.None  // Add this if needed

})
export class SuggestionListComponent implements OnInit {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchTerm: string = '';

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit() {
    this.suggestions = this.suggestionService.getSuggestions();
  }

  get acceptedCount(): number {
    return this.suggestions.filter(s => s.status === 'acceptee').length;
  }

  get pendingCount(): number {
    return this.suggestions.filter(s => s.status === 'en_attente').length;
  }

  get refusedCount(): number {
    return this.suggestions.filter(s => s.status === 'refusee').length;
  }

  likeSuggestion(suggestion: Suggestion) {
    suggestion.likes = (suggestion.likes ?? 0) + 1;
  }

  addToFavorites(suggestion: Suggestion) {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
      suggestion.isFavorite = true;
    }
  }

  get filteredSuggestions() {
    if (!this.searchTerm) return this.suggestions;

    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
