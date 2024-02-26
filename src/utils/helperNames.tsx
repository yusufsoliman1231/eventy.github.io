import {useRouter} from 'next/router';

export const UseHelperName = () => {
  const router = useRouter();
  return {
    company_name: router.query.company as string,
    _company_name: router.query._company_name as string,
    request_name: router.query.request_name as string,
    _id: router.query.id as any,
  };
};
