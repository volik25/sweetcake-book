/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLinkDto } from '../models/CreateLinkDto';
import type { LinkDto } from '../models/LinkDto';
import type { UpdateLinkDto } from '../models/UpdateLinkDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LinksService {

    /**
     * @returns LinkDto
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<LinkDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/links',
        });
    }

    /**
     * @param requestBody
     * @returns LinkDto
     * @throws ApiError
     */
    public static create(
        requestBody: CreateLinkDto,
    ): CancelablePromise<LinkDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/links',
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
        requestBody: UpdateLinkDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/links/{id}',
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
            url: '/api/links/{id}',
            path: {
                'id': id,
            },
        });
    }

}
