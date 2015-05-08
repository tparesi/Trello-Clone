TrelloClone.Routers.Trello = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new TrelloClone.Collections.Boards();
    this.collection.fetch();
  },

  routes: {
    '': "index",
    'boards/new': "new"
  },

  index: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: this.collection
    });
    this._swapView(indexView);
  },

  new: function () {
    model = new TrelloClone.Models.Board()
    var newView = new TrelloClone.Views.BoardsNew({
      model: model, collection: this.collection
    });
    this._swapView(newView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
