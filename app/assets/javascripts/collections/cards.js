TrelloClone.Collections.Cards = Backbone.Collection.extend({
  initialize: function (options) {
    this.list = options.list;
  },

  url: 'api/cards',
  model: TrelloClone.Models.Card,

  comparator: function(post) {
    return this.get("ord");
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    var collection = this;

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Card({ id: id });
      model.fetch({
        success: function () {
          collection.add(model);
        }
      });
    }

    return model;
  }
});
