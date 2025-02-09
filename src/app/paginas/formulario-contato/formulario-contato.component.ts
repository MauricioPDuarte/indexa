import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../componentes/container/container.component";
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    RouterLink,
],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initFormContato();
    this.buscarContato();
  }

  initFormContato() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('',  Validators.required),
      email: new FormControl('',  [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  buscarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contatoForm.patchValue(contato);
      });
    }
 
  }

  salvarContato() {
    const contato = this.contatoForm.value
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    contato.id = id ? parseInt(id) : null;
    
    this.contatoService.editarOuSalvarContato(contato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos')
    });

  }

  cancelar() {
    this.contatoForm.reset();
  }
}
