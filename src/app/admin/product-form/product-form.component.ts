import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../../album.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {
    'name': null,
    'price': null,
    'category': null,
    'imgUrl': null,
    'content': null,
    'artist': null,
    'year' : null,
    'rank' : null
  };

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: AlbumService) {


    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:curly
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
   }

  save(product) {
    // tslint:disable-next-line:curly
    if (this.id) this.productService.update(this.id, product);
    // tslint:disable-next-line:curly
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    // tslint:disable-next-line:curly
    if (!confirm('Are you sure you want to delete this procut?')) return;
      this.productService.delte(this.id);
      this.router.navigate(['/admin/products/']);
  }

  ngOnInit() {
  }

}
