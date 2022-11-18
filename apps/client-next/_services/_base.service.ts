/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */
import axios from 'axios';

const environment = {
  tokenKey: '@sweetcake.user.token',
};

export class BaseService<ItemEntity, UpdateDto> {
  /**
   * Базовый url сервиса
   */
  private _host = process.env.NEXT_PUBLIC_BASE_URL;
  private tokenKey = environment.tokenKey;
  private isServer = false;

  protected get host() {
    return this._host;
  }

  public get token() {
    if (this.isServer) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }
  /**
   * Расширение url сервиса
   */
  protected serviceUrl = '';

  get headers() {
    return this.token ? { Authorization: this.token } : {};
  }

  constructor(isServer: boolean) {
    this.isServer = isServer;
  }

  protected setToken(token: string) {
    if (this.isServer) {
      return;
    }
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken() {
    if (this.isServer) {
      return;
    }
    localStorage.removeItem(this.tokenKey);
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
