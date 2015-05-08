TrelloClone.Routers.Trello = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new TrelloClone.Collections.Boards();
    this.collection.fetch();
  },

  routes: {
    '': "index",
    'boards/:id': "show"
  },

  index: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: this.collection
    });
    this._swapView(indexView);
  },

  show: function (id) {
    var model = this.collection.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({
      model: model,
      collection: this.collection
    });
    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
