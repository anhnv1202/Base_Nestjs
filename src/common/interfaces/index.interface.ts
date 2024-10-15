// import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { Encoding } from '@common/constants/global.const';
import { StreamableFile } from '@nestjs/common';
import { IPopulate } from 'src/base/base.repository';
import { Pagination } from './filter.interface';

export interface FindAndCountQuery {
  select?: string;
  pagination: Pagination;
  populates?: IPopulate[];
  searchBy?: string[];
}

export interface FileExport {
  file: StreamableFile;
  headers: { [key: string]: string };
}

export interface ISendMail {
  to: string;
  from: any;
  subject: string;
  template?: string;
  html?: string;
  context?: { [key: string]: string };
}

export interface ITransportConfig {
  host: string;
  port: number;
  secure: boolean;
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface MatchImportFunction {
  url: string;
  callback?: (percent: number) => void;
  encoding?: Encoding;
}
