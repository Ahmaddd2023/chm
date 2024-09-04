import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveEmailResponse } from '../store';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  saveEmail(email: string): Observable<SaveEmailResponse> {
    return this.http.post<SaveEmailResponse>(
      `${environment.apiUrl}/tool/${environment.botId}/email-list/add`,
      {
        email: email,
      },
      {
        headers: new HttpHeaders({
          'X-Access-Token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHkiOiJtZXJjaGFudCIsIm1lcmNoYW50X2lkIjoiVkJNMjdQSllHTSIsImlhdCI6MTcwMzA3NzIyOH0.rnKs7HHrWDI6KhAtQWlg5cT8ZsBbTJFHICxb6m0tadk',
        }),
      },
    );
  }
}
