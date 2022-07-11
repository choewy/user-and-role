interface CustomQuery {
  (): any;
}

const customQuery: CustomQuery = () => {
  const search = window.location.search;
  const queryParams: any = {};

  const queryData = search.slice(1).split('&');
  queryData.forEach((data) => {
    const [key, value] = data.split('=');
    queryParams[key] = value;
  });

  return queryParams;
};

export default customQuery;
