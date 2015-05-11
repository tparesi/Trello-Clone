TrelloClone.Collections.Lists = Backbone.Collection.extend ({
  initialize: function (options) {
    this.board = options.board;
  },

  url: 'api/lists',
  model: TrelloClone.Models.List,

  comparator: function(post) {
    return this.get("ord");
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this;

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.List({ id: id });
      model.fetch({
        success: function () {
          collection.add(model);
        }
      });
    }

    return model;
  }
});
