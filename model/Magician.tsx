export class Magician {
  id: string;
  name: string;
  image: string;
  house: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  species: string;
  dateOfBirth: string;
  attempts: number = 0;
  isGuessed: boolean = false;

  constructor(params) {
    this.attempts = 0;
  }
}
