import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatDialogModule,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  game!: Game;
  currentCard: string | undefined = '';
  pickCardAnimation = false;
  firestore = this.firebaseService.firestore;
  loadedGame!: DocumentReference;
  gameId!: string;

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.firebaseService.getSingleGameRef(params['id']);
      this.gameId = params['id'];
      
      setTimeout(() => {
        this.game = this.firebaseService.singleGame[0];
      },1000);       
    });    
  }

  newGame() {
    this.game = new Game();
    this.firebaseService.addGame(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card != undefined) {
        this.currentCard = card;
      }
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.firebaseService.updateGame(this.gameId, this.game);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name != '') this.game.players.push(name);
        this.firebaseService.updateGame(this.gameId, this.game);
    });
  }
}
