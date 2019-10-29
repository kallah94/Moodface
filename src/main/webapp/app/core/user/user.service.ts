import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser } from './user.model';

type EntityResponseType = HttpResponse<IUser>;
type EntityArrayResponseType = HttpResponse<IUser[]>;
@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';
  public resourcesByServiceUrl = SERVER_API_URL + 'api/users/service';
  public resourcesByDepartementUrl = SERVER_API_URL + 'api/users/departement';
  public resourcesByPlateauUrl = SERVER_API_URL + 'api/users/plateau';

  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  find(login: string): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }

  plateaux(): Observable<any> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/plateaux');
  }

  services(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/services');
  }

  departements(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/departements');
  }

  getAllUsersByService(service: string): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(`${this.resourcesByServiceUrl}/${service}/users`, { observe: 'response' });
  }

  getUsersByDepartement(departement: string): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(`${this.resourcesByDepartementUrl}/${departement}/users`, { observe: 'response' });
  }

  findServicesByDepartement(departement: string): Observable<HttpResponse<String[]>> {
    return this.http.get<String[]>(`${this.resourceUrl}/${departement}/services`, { observe: 'response' });
  }

  getUsersByPlateauName(plateauName: String, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(`${this.resourceUrl}/plateau/${plateauName}/users`, { params: options, observe: 'response' });
  }

  findPlateauxByService(service: string): Observable<HttpResponse<String[]>> {
    return this.http.get<String[]>(`${this.resourceUrl}/${service}/plateaux`, { observe: 'response' });
  }

  findCurrentUser(): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourceUrl}/currentUser`, { observe: 'response' });
  }
}
