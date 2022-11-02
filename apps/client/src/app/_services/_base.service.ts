/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */
import axios from 'axios';
import { environment } from '../../environments/environment';

export class BaseService {
  private host = environment.base_url;
  private tokenKey = environment.tokenKey;
  /**
   * Базовый url сервиса
   */
  protected serviceUrl = '';

  get headers() {
    return {
      Authorization: localStorage.getItem(this.tokenKey) || '',
    };
  }

  /**
   * Параметры запроса
   * @options {}
   * Получение массива объектов
   * @returns {Promise<[T]>}
   */
  find<T>(options?: any): Promise<T[]> {
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
  public findById<T>(id: number): Promise<T> {
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
  create<T>(model: T): Promise<T> {
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
  update<T>(model: any): Promise<T> {
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
  deleteById<T>(id: number): Promise<T> {
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
