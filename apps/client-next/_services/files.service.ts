import { BaseService } from './_base.service';
import axios from 'axios';

export class FilesService extends BaseService<any, any> {
  serviceUrl = '/files';

  constructor(isServer = false) {
    super(isServer);
  }

  public uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    return axios
      .post<string>(this.host + this.serviceUrl + '/upload', formData, {
       
        headers: this.headers,
      })
      .then(({ data }) => data);
  }
}
