/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */
import axios from 'axios';
import { environment } from '../../environments/environment';

export class BaseService<T> {
  /**
   * Базовый url сервиса
   */
  private _host = environment.base_url;
  private tokenKey = environment.tokenKey;

  protected get host() {
    return this._host;
  }

  public get token() {
    return localStorage.getItem(this.tokenKey);
  }
  /**
   * Расширение url сервиса
   */
  protected serviceUrl = '';

  get headers() {
    return this.token ? { Authorization: this.token } : {};
  }

  protected setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Параметры запроса
   * @options {}
   * Получение массива объектов
   * @returns {Promise<[T]>}
   */
  find(options?: any): Promise<T[]> {
    const params: Record<string, unknown> = {};
    if (options) {
      Object.entries(options).map((o) => {
        params[o[0]] = o[1];
      });
    }
    return axios
      .get<T[]>(this.host + this.serviceUrl, {
        params,
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Получение объекта по идентификатору
   * @param {number} id
   * @returns {Promise<T>}
   */
  public findById(id: number): Promise<T> {
    return axios
      .get<T>(this.host + this.serviceUrl + '/' + id, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Создание объекта
   * @param {BaseEntity} model
   * @returns {Promise<T>}
   */
  create(model: T): Promise<T> {
    return axios
      .post<T>(this.host + this.serviceUrl, model, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Изменение объекта
   * @param {BaseEntity} model
   * @returns {Promise<T>}
   */
  update(model: any): Promise<T> {
    return axios
      .put<T>(this.host + this.serviceUrl + '/' + model.id, model, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Удаление объекта
   * @returns {Promise<T>}
   * @param id
   */
  deleteById(id: number): Promise<T> {
    return axios
      .delete<T>(this.host + this.serviceUrl + '/' + id, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  getParams(options: any) {
    const params: Record<string, unknown> = {};
    if (options) {
      Object.entries(options).map((o) => {
        params[o[0]] = o[1];
      });
    }
    return params;
  }
}
