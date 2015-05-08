TrelloClone.Collections.Boards = Backbone.Collection.extend ({
  url: 'api/boards',
  model: TrelloClone.Models.Board,

  comparator: function(board1, board2) {
    var time1 = new Date(boardt1.get('updated_at'));
    var time2 = new Date(board2.get('updated_at'));
    if (time1 > time2) {
      return -1;
    } else if (time1 < time2) {
      return 1;
    } else {
      return 0
    }
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Board({ id: id });
      model.fetch({
        success: function () {
          collection.add(model);
        }
      });
    }

    return model;
  }
});
