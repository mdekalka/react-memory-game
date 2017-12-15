class BoardModel {
  constructor(list) {
    this.list = this.setData(list);
  }

  setData(list = []) {
    const mapper = { ids: [], mapping: {} };

    return list.reduce((initial, accum) => {
      initial.ids.push(accum._id);
      initial.mapping[accum._id] = accum;

      return initial;
    }, mapper);
  }

  getItem(id) {
    return this.list.mapping[id];
  }

  setItem(id, data) {
    this.list.mapping[id] = { ...this.list.mapping[id], ...data };
  }

  getList() {
    return this.list.ids.map(id => this.list.mapping[id]);
  }
}

export default BoardModel;