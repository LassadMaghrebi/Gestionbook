export class Book {
    title: string;
    author: string;
    constructor(public photo: string, public synopsis: string) {
        this.title=photo
        this.author=synopsis
    }
  }