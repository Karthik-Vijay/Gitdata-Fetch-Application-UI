import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { GithubService } from '../github.service';
@Component({
    selector: 'app-github-pr',
    templateUrl: './github-pr.component.html',
    styleUrls: ['./github-pr.component.scss']
})
@Injectable()
export class GithubPRComponent implements OnInit {
    repoDetailsForm: FormGroup;
    show: boolean = false;
    currentPage = 0;
    searchSpin = false;
    showPaginator = false;
    showSpinner = false;
    nextPageLabel: string
    pageNumber = 1;
    totalPages;
    number;
    dataSource;
    openPullRequestCount;
    /**
     * displayedColumns should have matColumnDef headers of table 
     */
    displayedColumns: string[] = ['number', 'title', 'commentCount'];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private http: HttpClient, private _snackBar: MatSnackBar, private service: GithubService) {
        this.http = http;
    }


    ngOnInit() {
        this.createForm();
    }
    createForm() {
        /**
        Registering a form group with form controls owner and repo names
        */
        this.repoDetailsForm = new FormGroup({
            githubName: new FormControl('', Validators.required),
            githubOwnerName: new FormControl('', Validators.required)
        });
    }
    getPRDetails() {
        this.searchSpin = true;
        this.repoDetailsForm.getRawValue();
        console.log(this.repoDetailsForm.value);
        // setting content type
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });


        // invocation of rest call
        this.service.getPullRequestCount(`${environment.baseUrl}/getPullRequests/${this.repoDetailsForm.value.githubOwnerName}/${this.repoDetailsForm.value.githubName}/${this.pageNumber}`)
            .subscribe(
                (data: any) => {
                    console.log('GET Pull Requests is successful ', data);
                    this.dataSource = data.pullRequests;
                    this.currentPage = data.pageNumber;
                    this.totalPages = data.totalPages;
                    this.openPullRequestCount = data.pullRequestCount;
                    this.showSpinner = false;
                   this.searchSpin = false;
                   
                },
                error => {
                    this.dataSource = [];
                    this.searchSpin = false;
                    return this._snackBar.open('Error message: ' + error.error, '', {
                        duration: 4000, panelClass: ['gitDash-snackbar']
                    });
                }
                
            );
    }
    //  Pagination handler method
    public handlePage(e: any) {

        this.pageNumber = e.pageIndex + 1;
        this.showSpinner = true;
        this.getPRDetails();
        this.pageNumber = 0;
    }
}
