/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HeaderDto } from '../models/HeaderDto';
import type { UpdateHeaderDto } from '../models/UpdateHeaderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StaticService {

    /**
     * @returns HeaderDto
     * @throws ApiError
     */
    public static getHeader(): CancelablePromise<HeaderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/static/header',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static updateHeader(
        requestBody: UpdateHeaderDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/static/header',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
