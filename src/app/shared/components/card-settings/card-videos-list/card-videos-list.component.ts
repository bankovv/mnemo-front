import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CardVideosFacadeService } from '../../../../features/api/services/facades/card-videos-facade.service';
import { extractYtVideoId } from '../../../utils';

@Component({
  selector: 'app-card-videos-list',
  templateUrl: './card-videos-list.component.html',
  styleUrl: './card-videos-list.component.css'
})
export class CardVideosListComponent {

  private videoService = inject(CardVideosFacadeService);

  @Input('cardId')
  public cardId!: number ;

  @ViewChild('urlInput')
  public urlInput!: ElementRef;

  public videos!: string[];

  ngOnInit() {
    this.videoService.getVideos(this.cardId).subscribe((resp) => {
      this.videos = resp;
    });
  }

  public addVideo() {
    const url = this.urlInput.nativeElement.value;
    if (!url || url.length === 0 || this.videos.includes(url))
      return
    this.videos.push(url);
  }

  public removeVideo(video: string) {
    this.videos.splice(this.videos.indexOf(video), 1)
  }

  public getVideoPreview(video: string) {
    const videoId = extractYtVideoId(video);
    if (!videoId) return '';
   return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  public isNoVideos(): boolean {
    return !this.videos || this.videos.length === 0;
  }

}