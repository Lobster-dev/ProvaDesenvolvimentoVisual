import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
})
export class CadastrarJogoComponent implements OnInit {

  selecaoA!: Selecao;
  selecaoB!: Selecao;
  // obj selecao A e B

  selecaoAId!: number;
  selecaoBId!: number;
  // Usar para puxar o index da selecao no combobox

  selecoes!: Selecao[]
  // Array de seleções

  placarA?: number;
  placarB?: number;
  //placar dos jogos
  // Talvez não será necessario utilizar o placar
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Chamado todas as seleções cadastradas
    // para serem atribuidas ao array de seleções
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar")
      .subscribe({
        next: (selecoes) => {
          this.selecoes = selecoes;
        }
    });
  }

  cadastrar(): void {

    this.selecaoA = this.selecoes[this.selecaoAId - 1]
    this.selecaoB = this.selecoes[this.selecaoBId - 1]


    let jogos: Jogo = {
      selecaoA: this.selecaoA,
      selecaoB: this.selecaoB
    };
    console.log(jogos)
    this.http
      .post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogos)
      .subscribe({
        next: (jogo_enviado) => {
          console.log(jogo_enviado)
          this._snackBar.open("Jogo cadastrado com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/jogo/listar"]);
        },
        error: (error) => {
          console.error("Algum erro aconteceu")
        }
      })


  }
}
