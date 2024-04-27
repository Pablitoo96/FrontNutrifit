export class Usuario {
    _id: string;
    nombre: string;
    correo: string;
    contraseya_hash: string;
    edad?: number;
    peso?: number;
    altura?: number;

  
    constructor(_id: string, nombre: string, correo: string, contraseya_hash: string, edad?: number, peso?: number, altura?: number) {
      this._id = _id;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseya_hash = contraseya_hash;
      this.edad = edad;
      this.peso = peso;
      this.altura = altura;
    }
  }