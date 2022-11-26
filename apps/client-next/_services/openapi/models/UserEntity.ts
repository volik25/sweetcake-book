/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessTokenEntity } from './AccessTokenEntity';

export type UserEntity = {
    id: number;
    name: string;
    surname: string;
    secondname: string;
    email: string;
    password: string;
    tokens: Array<AccessTokenEntity>;
};

