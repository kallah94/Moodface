import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMood } from 'app/shared/model/mood.model';

type EntityResponseType = HttpResponse<IMood>;
type EntityArrayResponseType = HttpResponse<IMood[]>;

@Injectable({ providedIn: 'root' })
export class MoodService {
  public resourceUrl = SERVER_API_URL + 'api/moods';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/moods';

  constructor(protected http: HttpClient) {}

  create(mood: IMood): Observable<EntityResponseType> {
    return this.http.post<IMood>(this.resourceUrl, mood, { observe: 'response' });
  }

  update(mood: IMood): Observable<EntityResponseType> {
    return this.http.put<IMood>(this.resourceUrl, mood, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMood>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMood[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMood[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
