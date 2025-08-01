import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  salvar(cliente: Cliente): void {
    // Aqui você pode adicionar a lógica para salvar o cliente, como enviar para um serviço ou API
    console.log('Cliente salvo:', cliente);
  }
}
