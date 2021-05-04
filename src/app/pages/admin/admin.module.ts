import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { ClientComponent } from 'src/app/components/client/client.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { InfoClientComponent } from 'src/app/components/info-client/info-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExploratoryAnalysisComponent } from 'src/app/components/exploratory-analysis/exploratory-analysis.component';

@NgModule({
  declarations: [
    AdminComponent,
    SearchBarComponent,
    ClientComponent,
    TableComponent,
    InfoClientComponent,
    ExploratoryAnalysisComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
