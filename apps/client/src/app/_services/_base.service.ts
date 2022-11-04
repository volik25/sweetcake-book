/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */
import axios from 'axios';
import { environment } from '../../environments/environment';

export class BaseService<ItemEntity, UpdateDto> {
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
   * @returns {Promise<[ItemEntity]>}
   */
  find(options?: any): Promise<ItemEntity[]> {
    const params: Record<string, unknown> = {};
    if (options) {
      Object.entries(options).map((o) => {
        params[o[0]] = o[1];
      });
    }
    return axios
      .get<ItemEntity[]>(this.host + this.serviceUrl, {
        params,
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Получение объекта по идентификатору
   * @param {number} id
   * @returns {Promise<ItemEntity>}
   */
  public findById(id: number): Promise<ItemEntity> {
    return axios
      .get<ItemEntity>(this.host + this.serviceUrl + '/' + id, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Создание объекта
   * @param {BaseEntity} model
   * @returns {Promise<ItemEntity>}
   */
  create(model: any): Promise<ItemEntity> {
    return axios
      .post<ItemEntity>(this.host + this.serviceUrl, model, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Изменение объекта
   * @param {BaseEntity} model
   * @returns {Promise<ItemEntity>}
   */
  update(id: number, model: UpdateDto): Promise<unknown> {
    return axios
      .put<ItemEntity>(this.host + this.serviceUrl + '/' + id, model, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  /**
   * Удаление объекта
   * @returns {Promise<ItemEntity>}
   * @param id
   */
  deleteById(id: number): Promise<ItemEntity> {
    return axios
      .delete<ItemEntity>(this.host + this.serviceUrl + '/' + id, {
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
