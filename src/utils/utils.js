import cuid from 'cuid';

export const extendWithId = (list = []) => {
  return list.map(listItem => {
    return { ...listItem, _id: cuid() };
  })
}
