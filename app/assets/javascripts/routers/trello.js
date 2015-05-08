TrelloClone.Routes.Trello = Backbone.Router.extend({
  initialize: function () {
    this.collection = new TrelloClone.Collections.Boards();
    this.collection.fetch();
  },

  routes: {
    '': "index"
  },

  index: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: this.collection;
    })
    this._swapView(indexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
