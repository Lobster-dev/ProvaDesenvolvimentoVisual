import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {

  jogos!: Jogo

  selecaoA!: Selecao;
  selecaoB!: Selecao;

  selecaoANome!: string;
  selecaoBNome!: string;

  palpiteA!: number;
  palpiteB!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log(this.route)
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http
            .get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`)
            .subscribe({
              next: (jogo) => {
                this.jogos = jogo;
                console.log(jogo)
              },
            });
        }
      },
    });
    }


    alterar(): void {
      // Chamando APi para Alterar o jogo

      let jogoPalpite: Jogo = {
        selecaoA: this.selecaoA,
        selecaoB: this.selecaoB,
        placarTimeA: this.palpiteA,
        placarTimeB: this.palpiteB
      };
     
      this.http.post<Jogo>("https://localhost:5001/api/jogo/alterar-jogo", jogoPalpite)
        .subscribe({
          next: (funcionario) => {
            this._snackBar.open("Palpite cadastrado", "Ok!", {
              horizontalPosition: "right",
              verticalPosition: "top",
            });
            this.router.navigate(["pages/jogo/listar"]);
          },
        });
      
    }   
  }