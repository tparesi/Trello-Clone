TrelloClone.Models.List = Backbone.Model.extend ({
  urlRoot: 'api/lists',

  comparator: function(post) {
    return this.get("ord");
  }
});
