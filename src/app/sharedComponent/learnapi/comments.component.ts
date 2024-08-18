import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class LearnapiComponent implements OnInit {
constructor(private commentService: CommentService){

}
comments: any[] = []
@ViewChild('commentBox') commentBox!: ElementRef;
currentPage: number = 1;
pageSize: number = 8;
maxChars: number = 250;

attachedImage: string | null = null;

ngOnInit(): void {
  this.loadComments();
}

formatText(command: string) {
  document.execCommand(command, false, '');
}

cancelComment() {
  this.commentBox.nativeElement.innerHTML = '';
  this.attachedImage = '';
}

sendComment() {
  let comment = this.commentBox.nativeElement.innerHTML;

  let commentObj = {
    commentText : comment,
    commentImg : this.attachedImage,
    commenttime : new Date().toISOString()
  }
  this.commentService.addComment(commentObj).then(() => {
    this.loadComments(); // Refresh comments after adding
    this.attachedImage = null;
    this.commentBox.nativeElement.innerHTML = '';
  });
  // this.comments.push(commentObj)
  
  this.attachedImage = '';
}
latestComment(){
  this.commentService.fetchLatestComments().subscribe((comment) => {
    this.comments = comment;
  });
}
limitCharacters(event: Event, commentBox: HTMLElement){
  const textContent = commentBox.innerText || '';
  if (textContent.length > this.maxChars) {
    commentBox.innerText = textContent.substring(0, this.maxChars);
  }
}
loadPopularComment(){
  
}
loadComments() {
  this.commentService
    .fetchComments(this.currentPage, this.pageSize)
    .subscribe((comments) => {
      this.comments = comments.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    });
}
triggerFileInput() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}

attachImage(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.attachedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

nextPage() {
  this.currentPage++;
  this.loadComments();
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadComments();
  }
}
}






