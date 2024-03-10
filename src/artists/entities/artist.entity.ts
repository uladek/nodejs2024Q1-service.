// export interface Artist {
//     id: string; // uuid v4
//     name: string;
//     grammy: boolean;
//   }

// export class Artist {
//   id: string; // uuid v4
//   name: string;
//   grammy: boolean;
// }

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(id: string, name: string, grammy: boolean) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
