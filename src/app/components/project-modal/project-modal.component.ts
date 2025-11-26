import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent {
  @Input() project?: Project;
  @Output() close = new EventEmitter<void>();
  visible = true;
  private closeTimeout: any;

  ngOnInit(): void {
    this.visible = true;
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.requestClose();
    }
  }

  requestClose() {
    // play closing animation, then emit close
    this.visible = false;
    // match the CSS closing animation duration (420ms)
    this.closeTimeout = setTimeout(() => this.close.emit(), 420);
  }
}
