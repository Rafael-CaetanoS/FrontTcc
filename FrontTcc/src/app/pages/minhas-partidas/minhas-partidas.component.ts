import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BuscarPartidaComponent } from '../buscar-partida/buscar-partida.component';
import { CommonModule } from '@angular/common';
import { PartidaResponse } from '../../types/partida-response.type';
import { CardBuscarPartidaComponent } from "../../components/card-buscar-partida/card-buscar-partida.component";
import { PartidasService } from '../../services/partidas.service';
import { NavbarprincipalComponent } from "../../components/navbarprincipal/navbarprincipal.component";

@Component({
  selector: 'app-minha-partidas',
  standalone: true,
  imports: [SidebarComponent, CommonModule, CardBuscarPartidaComponent, NavbarprincipalComponent],
  templateUrl: './minhas-partidas.component.html',
  styleUrl: './minhas-partidas.component.css'
})
export class MinhaPartidasComponent implements OnInit {
  partidas: PartidaResponse[] = [];
  dataAtual = new Date();

  constructor(private service: PartidasService){}

  ngOnInit(): void {
    this.service.getPartidasAtleta().subscribe({
      next: (res) => {
        this.partidas = res
        .filter((item) => new Date(item.data) >= this.dataAtual)
        .map((item) => ({
          idPartida: item.idPartida,
          titulo: item.titulo,
          descricao: item.descricao,
          horaInicio: item.horaInicio,
          horaFim: item.horaFim,
          data: item.data,
          faixaEtaria: item.faixaEtaria,
          qtdeAtletas: item.qtdeAtletas,
          endereco: item.endereco,
          nomeLocal: item.nomeLocal,
          cidade: item.cidade,
          atleta: {
            idAtleta: item.atleta.idAtleta,
            nomeAtleta: item.atleta.nomeAtleta,
          },
          esporte: {
            idEsporte: item.esporte.idEsporte,
            nomeEsporte: item.esporte.nomeEsporte,
          },
          statusPartida:{
            idStatusPartida:item.statusPartida.idStatusPartida
          }
        }));
        console.log(this.partidas);
      },
      error: (err) => console.log(err),
    });
  }
}

