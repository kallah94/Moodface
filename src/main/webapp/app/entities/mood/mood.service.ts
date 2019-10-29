import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMood } from 'app/shared/model/mood.model';
import { IMoodboard } from 'app/shared/model/moodboard.model';

type EntityResponseType = HttpResponse<IMood>;
type EntityArrayResponseType = HttpResponse<IMood[]>;

@Injectable({ providedIn: 'root' })
export class MoodService {
  public resourceUrl = SERVER_API_URL + 'api/moods';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/moods';

  constructor(protected http: HttpClient) {}

  create(mood: IMood): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mood);
    return this.http
      .post<IMood>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mood: IMood): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mood);
    return this.http
      .put<IMood>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMood>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMood[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMood[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(mood: IMood): IMood {
    const copy: IMood = Object.assign({}, mood, {
      date: mood.date != null && mood.date.isValid() ? mood.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mood: IMood) => {
        mood.date = mood.date != null ? moment(mood.date) : null;
      });
    }
    return res;
  }

  public getMoodValuePlateau(plateauName: String): Observable<HttpResponse<Number[]>> {
    return this.http.get<Number[]>(`${this.resourceUrl}/countListByValue/plateau/${plateauName}`, { observe: 'response' });
  }

  public getMoodByDepartement(departementName: String): Observable<EntityArrayResponseType> {
    return this.http.get<IMood[]>(`${this.resourceUrl}/departement/${departementName}`, { observe: 'response' });
  }

  public getMoodValueService(serviceName: String): Observable<HttpResponse<Number[]>> {
    return this.http.get<Number[]>(`${this.resourceUrl}/countListByValue/service/${serviceName}`, { observe: 'response' });
  }

  public getMoodByService(serviceName: String): Observable<EntityArrayResponseType> {
    return this.http.get<IMood[]>(`${this.resourceUrl}/service/${serviceName}`, { observe: 'response' });
  }

  public getMoodByPlateau(plateauName: String): Observable<EntityArrayResponseType> {
    return this.http
      .get<IMood[]>(`${this.resourceUrl}/plateau/${plateauName}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  public getMoodValueDepartement(departementName: String): Observable<HttpResponse<Number[]>> {
    return this.http.get<Number[]>(`${this.resourceUrl}/countListByValue/departement/${departementName}`, { observe: 'response' });
  }

  public getMoodBoardDepartement(departementName: String): Observable<HttpResponse<IMoodboard>> {
    return this.http.get<IMoodboard>(`${this.resourceUrl}/Moodweekdepartement/${departementName}`, { observe: 'response' });
  }
}
