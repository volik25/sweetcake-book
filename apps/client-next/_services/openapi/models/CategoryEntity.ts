/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CakeEntity } from './CakeEntity';

export type CategoryEntity = {
    id: number;
    img: string;
    name: string;
    cakes: Array<CakeEntity>;
};

