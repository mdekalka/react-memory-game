import cuid from 'cuid';

export const extendWithId = (list = []) => {
  return list.map(listItem => {
    return { ...listItem, _id: cuid() };
  })
}

export const isKeysFalsy = (object, keys) => {
  return keys.every(key => !object[key]);
}
