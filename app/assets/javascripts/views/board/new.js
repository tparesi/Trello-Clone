TrelloClone.Views.BoardsNew = Backbone.View.extend({
  events: {
    "click .new-board": "createBoard"
  },

  tagName: "form",
  template: JST["board/new"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createBoard: function (event) {
    event.preventDefault();
    var attr = this.$el.serializeJSON();

    this.model.set(attr);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate('', { trigger: true })
      }.bind(this)
    });
  }

});
