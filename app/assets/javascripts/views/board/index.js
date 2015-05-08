TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  events: {
    "click .create-board-form": "createBoardForm",
    "click .create-board": "createBoard",
    "click .close-form": "removeForm",
  },

  template: JST["board/index"],
  newBoardTemplate: JST["board/new"],
  newBoardButtonTemplate: JST["board/new_board_button"],

  render: function () {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    return this;
  },

  createBoardForm: function (event) {
    event.preventDefault();
    var content = this.newBoardTemplate();
    $("#new-board").html(content);
  },

  createBoard: function (event) {
    event.preventDefault();
    var attr = $(".new-board-form").serializeJSON();
    var model = new TrelloClone.Models.Board();
    model.set(attr);
    model.save({}, {
      success: function () {
        this.collection.add(model);
        var html = "#/boards/" + model.get("id");
        Backbone.history.navigate(html, { trigger: true });
      }.bind(this)
    });
  },

  removeForm: function (event) {
    event.preventDefault();
    var content = this.newBoardButtonTemplate();
    $("#new-board").html(content);
  }

});
