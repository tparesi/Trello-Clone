TrelloClone.Views.BoardShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync remove", this.render);
    this.listenTo(this.model.lists(), "add", this.render);
  },

  events: {
    "click .create-list-form": "createListForm",
    "click .create-list": "createList",
    "click .close-form": "removeForm",
    "click .delete-board": "removeBoard"
  },

  template: JST["board/show"],
  newListTemplate: JST["list/new"],
  newListButtonTemplate: JST["list/new_list_button"],
  removeCardButtonTemplate: JST["card/remove_card_button"],

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  removeBoard: function (event) {
    event.preventDefault();
    var ask = confirm("Are you sure you want to delete this Board?");
    if(ask){
      var id = $(event.target).data("id");
      var model = this.collection.get(id);
      model.destroy({
        success: function () {
          Backbone.history.navigate("#", { trigger: true });
        },
        wait: true
      });
    }
  },

  createListForm: function (event) {
    event.preventDefault();
    var content = this.newListTemplate({ board: this.model });
    $("#new-list").html(content);
  },

  createList: function (event) {
    event.preventDefault();
    var attr = $(".new-list-form").serializeJSON();
    var model = new TrelloClone.Models.List();
    model.set(attr);
    model.save({}, {
      success: function () {
        this.model.lists().add(model);
        // var html = "#/boards/" + model.get("id");
        // Backbone.history.navigate(html, { trigger: true });
      }.bind(this)
    });
  },

  removeForm: function (event) {
    event.preventDefault();
    var content = this.newListButtonTemplate();
    $("#new-list").html(content);
  },

  // showRemoveButton: function (event) {
  //   event.preventDefault();
  //   console.log("hello");
  //   var content = this.removeCardButtonTemplate();
  //   $(".card").html(content);
  // }

});
