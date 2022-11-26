/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryEntity } from '../models/CategoryEntity';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { UpdateCategoryDto } from '../models/UpdateCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryService {

    /**
     * @returns CategoryEntity
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<CategoryEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/category',
        });
    }

    /**
     * @param requestBody
     * @returns CategoryEntity
     * @throws ApiError
     */
    public static create(
        requestBody: CreateCategoryDto,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/category',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns CategoryEntity
     * @throws ApiError
     */
    public static findById(
        id: number,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/category/{id}',
            path: {
                'id': id,
            },
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
        requestBody: UpdateCategoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/category/{id}',
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
            url: '/api/category/{id}',
            path: {
                'id': id,
            },
        });
    }

}
