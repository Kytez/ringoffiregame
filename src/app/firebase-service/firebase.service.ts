import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);

  games: Game[] = [];
  singleGame: Game[] = [];

  unsubGame;

  constructor() {
    this.unsubGame = this.subGames();
  }

  async updateGame(docRef: string, game: Game){
    if(docRef){
      let gameToUpdate = this.getSingleGame(docRef);
      await updateDoc(gameToUpdate,this.getClearJson(game));
    }
  }

  getClearJson(game: Game){
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer
    }
  }

  async addGame(item: Game) {
    let gameData = {
      players: item.players,
      stack: item.stack,
      playedCards: item.playedCards,
      currentPlayer: item.currentPlayer
    }
    return await addDoc(this.getGamesRef(), gameData);
  }

  ngOnDestroy() {
    this.unsubGame();
  }

  subGames() {
    return onSnapshot(this.getGamesRef(), (gamesRef) => {
      this.games = [];
      gamesRef.forEach((game) => {
        this.games.push(this.setGameObject(game.data()));
      })
    })
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  setGameObject(obj: any) {
    return {
      players: obj.players,
      stack: obj.stack,
      playedCards: obj.playedCards,
      currentPlayer: obj.currentPlayer
    }
  }
  getSingleGame(gameId: string) {
    return doc(collection(this.firestore, 'games'), gameId);
  }

  getSingleGameRef(gameId: string) {
    return onSnapshot(doc(this.firestore, 'games', gameId), (game) => {
      this.singleGame.push(this.setGameObject(game.data()));
    })
  }
}
