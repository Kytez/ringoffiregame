import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  game!: Game;

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  newGame() {
    this.game = new Game();
    this.firebaseService.addGame(this.game).then((game) => {
      this.router.navigateByUrl('/game/' + game.id);
    })
  }

}