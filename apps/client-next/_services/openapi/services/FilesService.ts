/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileUploadDto } from '../models/FileUploadDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FilesService {

    /**
     * @param formData File to upload
     * @returns string
     * @throws ApiError
     */
    public static upload(
        formData: FileUploadDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/files/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
