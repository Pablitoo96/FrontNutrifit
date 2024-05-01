export class Crearusuario {
    nombre: string;
    correo: string;
    contrasenya_hash?: string;
    edad?: number;
    peso?: number;
    altura?: number;
    sexo?: string;

  
    constructor(_id: string, nombre: string, correo: string, contrasenya_hash: string, edad?: number, peso?: number, altura?: number, sexo?: string) {
      this.nombre = nombre;
      this.correo = correo;
      this.contrasenya_hash = contrasenya_hash;
      this.edad = edad;
      this.peso = peso;
      this.altura = altura;
      this.sexo = sexo
    }
  }