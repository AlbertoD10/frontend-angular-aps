import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  client = {
    id: '',
  };
  searchForm!: FormGroup;
  showValidation: boolean = false;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      id: new FormControl(this.client.id, [Validators.required]),
    });
  }

  get id() {
    return this.searchForm.get('id');
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }

  getClient() {
    this.clientService.getClient(this.searchForm.value.id);
    this.showValidation = true;

    if (this.searchForm.status === 'VALID') {
      this.clientService.getClient(this.searchForm.value.id).subscribe(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem('client', JSON.stringify(res.userStored));
            this.router.navigate(['/client']);
          }
        },
        (err) => {
          if (err.error.errors) {
            err.error.errors.map((result: any) => {
              this.showError(result.msg);
              console.log(result);
            });
          } else {
            this.showError(err.error.message);
          }
        }
      );
    }
  }
}
