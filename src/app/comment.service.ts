import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private dbPath = '/comments';

  constructor(private db: AngularFireDatabase) {}

  addComment(commentObj: any) {
    const commentsRef = this.db.list(this.dbPath);
    return commentsRef.push(commentObj);
  }

  fetchComments(pageNumber: number, pageSize: number) {
    return this.db
      .list(this.dbPath, (ref) =>
        ref.orderByKey().limitToFirst(pageNumber * pageSize + pageSize)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val() as any,
          }))
        )
      );
  }

    // Method to fetch the latest comment
    fetchLatestComments(): Observable<any> {
        return this.db
          .list(this.dbPath, (ref) =>
            ref.orderByChild('commenttime') 
          )
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({
                key: c.payload.key,
                ...c.payload.val() as any,
              })).reverse()
            )
          );
      }
}
