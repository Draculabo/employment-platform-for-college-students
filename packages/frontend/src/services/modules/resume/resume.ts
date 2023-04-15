import { ICommunityArticle, ICommunityArticleUpdate, ICommunityCondition, ICommunityLike } from '@/types/type';
import { get, post } from '../../config';
import { ResponseData, resolve } from '../../type';
import { ResumeViewRequest, ResumeViewResponse } from './type';
import queryString from 'query-string';

export function reviewResume(data: ResumeViewRequest) {
  // return resolve(get<ResponseData<ResumeViewResponse>>(`/resume/review/${queryString.stringify(data)}`));

  return resolve(
    get<ResponseData<ResumeViewResponse>>(
      queryString.stringifyUrl({
        url: '/resume/review',
        query: {
          ...data,
        },
      })
    )
  );
}
export function improveResumeBySentence(data: ResumeViewRequest) {
  return resolve(
    get<ResponseData<ResumeViewResponse>>(
      queryString.stringifyUrl({
        url: '/resume/sentence',
        query: {
          ...data,
        },
      })
    )
  );
}
