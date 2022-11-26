/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CakeComponentEntity } from './CakeComponentEntity';
import type { CategoryEntity } from './CategoryEntity';

export type CakeEntity = {
    id: number;
    img: string;
    name: string;
    price: number;
    weight: number;
    category: CategoryEntity;
    components: Array<CakeComponentEntity>;
};

