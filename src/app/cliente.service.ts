import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente): void {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente): void {
    const storage = this.obterStorage();
    const index = storage.findIndex(c => c.id === cliente.id);
    
    if (index !== -1) {
      storage[index] = { ...storage[index], ...cliente };
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }
  } 

  deletar(cliente: Cliente): void {
    const storage = this.obterStorage();
    const novaLista = storage.filter(c => c.id !== cliente.id);

    // outra forma de deletar
    // const indexItem = storage.indexOf(cliente);
    // if (indexItem > -1) {
    //   storage.splice(indexItem, 1);
    // } 
    
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {

    const clientes = this.obterStorage();

    if(!nomeBusca || nomeBusca.trim() === '') {
      return clientes;
    }
    // Filtra os clientes pelo nome
    nomeBusca = nomeBusca.toLowerCase().trim();
    return clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca) !== -1);
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  } 

  private obterStorage() : Cliente[] {
    const clientesJson = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (clientesJson) {
      return JSON.parse(clientesJson) as Cliente[];
    }
    
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;

  }

}
