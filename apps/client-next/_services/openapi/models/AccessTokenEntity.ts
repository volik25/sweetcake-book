/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type AccessTokenEntity = {
    id: number;
    token: string;
    expires: number;
    user: UserEntity;
};

