import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(private fb: FormBuilder, private router: Router
    , private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z]*$')
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date().toLocaleDateString(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  onSubmit() {
    if (this.suggestionForm.invalid) return;

    const newSuggestion: Suggestion = {
      id: Date.now(),   // auto
      title: this.suggestionForm.get('title')?.value,
      description: this.suggestionForm.get('description')?.value,
      category: this.suggestionForm.get('category')?.value,
      date: new Date(),
      status: 'en_attente',
      likes: 0,
      isFavorite: false
    };

    console.log('Nouvelle suggestion :', newSuggestion);

    // ✅ Redirection vers la liste
    this.suggestionService.addSuggestion(newSuggestion);

  // ✅ REDIRECTION
  this.router.navigate(['/suggestions']);
  }

  get f() {
    return this.suggestionForm.controls;
  }
}
