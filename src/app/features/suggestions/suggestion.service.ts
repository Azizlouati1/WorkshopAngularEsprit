import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building...',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      likes: 5,
      isFavorite: false
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations...',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      likes: 2,
      isFavorite: false
    },
    // add alot of mock suggestions here
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses...',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      likes: 8,
      isFavorite: false
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur...',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      likes: 15,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur les bonnes pratiques...',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      likes: 12,
      isFavorite: true
    }
  ];

  getSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  addSuggestion(suggestion: Suggestion) {
    this.suggestions.push(suggestion);
  }

  getNextId(): number {
    return this.suggestions.length
      ? Math.max(...this.suggestions.map(s => s.id)) + 1
      : 1;
  }
}
