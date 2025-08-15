import { Component, OnInit, Inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MessageService } from '../services/message.service';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    NgxMaskDirective,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective,
  ], providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private service: ClienteService, 
    private brasilapiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {  
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.uf) {
            const event: MatSelectChange = { value: this.cliente.uf } as MatSelectChange;
            this.carregarMunicipios(event);
          }
        }
      }
    });
    
    this.carregarUFs();
  }

   carregarUFs() {
    //observable (subscriber) para pegar os estados
      this.brasilapiService.listarUFs().subscribe({
        next: listaEstados => this.estados = listaEstados,
        error: erro => console.error('Erro ao carregar estados:', erro)
      });
    }

    carregarMunicipios(event: MatSelectChange) {
      const ufSelecionada = event.value;
      this.brasilapiService.listarMunicipios(ufSelecionada).subscribe({
        next: listaMunicipios => this.municipios = listaMunicipios,
        error: erro => console.error('Erro ao carregar municípios:', erro)
      });
    }

  salvar() {
    if(!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.messageService.showMessage('Cliente cadastrado com sucesso!');
    }else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.atualizando = false;
      this.messageService.showMessage('Cliente atualizado com sucesso!');
    }
  }
}
