import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Part } from 'src/app/Models/parts';
import { PartsService } from 'src/app/services/parts.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css'],
})
export class PartsComponent implements OnInit {
  constructor(
    private service: PartsService,
    private activatedRoute: ActivatedRoute
  ) {}
  parts!: Part[];
  brandId!: string;
  ngOnInit(): void {
    // Getting Id from route
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.brandId = response['id'];
      },
    });

    // Service Call
    this.service.getPartsByBrandId(this.brandId).subscribe({
      next: (response) => {
        console.log(response);
        this.parts = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
