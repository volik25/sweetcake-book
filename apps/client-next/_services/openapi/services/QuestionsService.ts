/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuestionDto } from '../models/CreateQuestionDto';
import type { QuestionDto } from '../models/QuestionDto';
import type { UpdateQuestionDto } from '../models/UpdateQuestionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * @returns QuestionDto
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<QuestionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/questions',
        });
    }

    /**
     * @param requestBody
     * @returns QuestionDto
     * @throws ApiError
     */
    public static create(
        requestBody: CreateQuestionDto,
    ): CancelablePromise<QuestionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/questions',
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
        requestBody: UpdateQuestionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/questions/{id}',
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
            url: '/api/questions/{id}',
            path: {
                'id': id,
            },
        });
    }

}
