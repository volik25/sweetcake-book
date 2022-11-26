/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CakeComponentEntity } from '../models/CakeComponentEntity';
import type { CakeEntity } from '../models/CakeEntity';
import type { CreateCakeDto } from '../models/CreateCakeDto';
import type { CreateComponentDto } from '../models/CreateComponentDto';
import type { UpdateCakeDto } from '../models/UpdateCakeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CakeService {

    /**
     * @returns CakeEntity
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<CakeEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cake',
        });
    }

    /**
     * @param requestBody
     * @returns CakeEntity
     * @throws ApiError
     */
    public static create(
        requestBody: CreateCakeDto,
    ): CancelablePromise<CakeEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cake',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns CakeComponentEntity
     * @throws ApiError
     */
    public static findComponents(): CancelablePromise<Array<CakeComponentEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cake/components',
        });
    }

    /**
     * @param requestBody
     * @returns CakeComponentEntity
     * @throws ApiError
     */
    public static createComponent(
        requestBody: CreateComponentDto,
    ): CancelablePromise<CakeComponentEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cake/components',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static update(
        id: number,
        requestBody: UpdateCakeDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cake/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static delete(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cake/{id}',
            path: {
                'id': id,
            },
        });
    }

}
