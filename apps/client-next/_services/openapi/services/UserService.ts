/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDTO } from '../models/CreateUserDTO';
import type { UserEntity } from '../models/UserEntity';
import type { UserLoginDTO } from '../models/UserLoginDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static check(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/check',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static logout(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/logout',
        });
    }

    /**
     * @returns UserEntity
     * @throws ApiError
     */
    public static findOne(): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/{id}',
        });
    }

    /**
     * @returns UserEntity
     * @throws ApiError
     */
    public static find(): CancelablePromise<Array<UserEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user',
        });
    }

    /**
     * @param requestBody
     * @returns UserEntity
     * @throws ApiError
     */
    public static create(
        requestBody: CreateUserDTO,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static login(
        requestBody: UserLoginDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static checkEmail(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/check-email',
        });
    }

}
