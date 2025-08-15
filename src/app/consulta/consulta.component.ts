import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule, 
    MatCardModule, 
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  
  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];

  constructor(private service: ClienteService, private router: Router, private messageService: MessageService) { 

  }

  ngOnInit(): void {
    console.log('ConsultaComponent initialized');
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string){
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  preparaDeletar(cliente: Cliente){
    cliente.deletando = true;
    //     setTimeout(() => {
    //   this.deletando = false;
    //   const cliente = this.service.buscarClientePorId(id);
    //   if (cliente) {
    //     this.service.atualizar({ ...cliente, deletado: true });
    //     this.listaClientes = this.listaClientes.filter(c => c.id !== id);
    //   }
    // }, 2000);
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.messageService.showMessage('Cliente deletado com sucesso!');
  }
}
