TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model.lists(), 'remove', this.removeListView);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), 'add', this.addListView);
    this.model.lists().each(this.addListView.bind(this));
  },

  events: {
    "click .delete-board": "removeBoard",
    "click .create-list-form": "createListForm",
    "click .create-list": "createList",
    "click .close-list-form": "removeListForm",
    "mousedown .list": "addDraggedClass"
  },

  template: JST["board/show"],
  newListTemplate: JST["list/new"],
  newListButtonTemplate: JST["list/new_list_button"],

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.sortable();
    return this;
  },

  addDraggedClass: function (event) {
    $(event.currentTarget).addClass("dragged");
    $(event.currentTarget).mouseup(function() {
      $(this).removeClass("dragged");
    })
  },

  sortable: function () {
    $(".sortable").sortable({
      connectWith: ".sortable"
    }).disableSelection();

    $(".sortable-list").sortable({
      connectWith: ".sortable-list"
    }).disableSelection();
  },

  removeListView: function (list) {
    this.removeModelSubview('.board-show', list);
  },

  addListView: function (list) {
    var subview = new TrelloClone.Views.Lists({ model: list });
    this.addSubview('.board-show', subview);
  },

  createListForm: function (event) {
    event.preventDefault();
    var content = this.newListTemplate({ board: this.model });
    $(".new-list").html(content);
  },

  createList: function (event) {
    event.preventDefault();
    var attr = $(".new-list-form").serializeJSON();
    var model = new TrelloClone.Models.List();
    model.set(attr);
    model.save({}, {
      success: function () {
        this.model.lists().add(model);
        this.removeListForm()
      }.bind(this)
    });
  },

  removeListForm: function (event) {
    event && event.preventDefault();
    var content = this.newListButtonTemplate();
    $(".new-list").html(content);
  },
});
