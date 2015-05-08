TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  tagName: "ul",
  template: JST['boards/index'],

  render: function () {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
  }

});
