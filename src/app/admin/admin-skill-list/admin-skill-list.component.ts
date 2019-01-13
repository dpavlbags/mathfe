import { Component, OnInit, Inject } from '@angular/core';
import { Skill } from 'app/models/skill';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component"
import { SkillService } from 'app/services/skill.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'ag-admin-skill-list',
  templateUrl: './admin-skill-list.component.html',
  styleUrls: ['./admin-skill-list.component.css']
})
export class AdminSkillListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public skills: Skill[];
  public loading: boolean = true;


  // sort block

  public sortedByTitle: boolean = false;
  public sortedByDescription: boolean = false;
  public sortedByAuther: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByDescription: boolean = false;
  public reversedByAuther: boolean = false;

  constructor(
    private _router: Router,
    private skillService: SkillService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._updateloading(true);
    this.skillService.getSkills()
      .subscribe(items => {
        this.skills = items.sort(this._sortById);
        this._updateloading(false);
      });
  }
  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.skillService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.skillService.updateStatus;
  }

  public videoUrl(url: string): string {
    if (url)
      return this._beURL + url;
    else return  this._beURL + "/videos/skills/logo.mp4"
  }

  public editSkill(id: number): void {
    this._router.navigate(['/admin/skills/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Skill" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/skills/delete', id]);
        } else {
          //rejected
        }
      });
  }
  // sort block

  public sortBy(str: string): void {
    if (this.skills && this.skills.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.skills.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.skills.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
        case 'auther':
          if (this.sortedByAuther) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByAuther = true;
          }
          else {
            this.skills.sort(this._sortByAuther);
            this._resetSort();
            this.sortedByAuther = true;
          }
          break;
      }
    }
  }


  private _sortById(a: Skill, b: Skill): number {
    if (a.id < b.id) {
      return -1;
    }
    else if (a.id > b.id) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByTitle(a: Skill, b: Skill): number {
    if (a.skill.toLowerCase() < b.skill.toLowerCase()) {
      return -1;
    }
    else if (a.skill.toLowerCase() > b.skill.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Skill, b: Skill): number {
    if (a.description.toLowerCase() < b.description.toLowerCase()) {
      return -1;
    }
    else if (a.description.toLowerCase() > b.description.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByAuther(a, b): number {
    if (a.user.firstname.toLowerCase() < b.user.firstname.toLowerCase()) {
      return -1;
    }
    else if (a.user.firstname.toLowerCase() > b.user.firstname.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _resetSort(): void {
    this.sortedByTitle = false;
    this.sortedByDescription = false;
    this.reversedByTitle = false;
    this.reversedByDescription = false;
    this.reversedByAuther = false;

  }

}