import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../componentes/container/container.component";
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    ContainerComponent,
    SeparadorComponent,
    CabecalhoComponent
],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    avatar: '',
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router,
  ) {}

  ngOnInit() {
   this.obter();
  }

  obter() {
   const id = this.activatedRoute.snapshot.paramMap.get('id');

   if(id) {
    this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
      this.contato = contato;
    });
   }
  }

  excluir() {
    if(this.contato.id) {
      this.contatoService.excluirPorId(this.contato.id).subscribe(() => {
        this.router.navigateByUrl('/lista-contatos')
      });
    }
   
  }
}
