TrelloClone.Views.Lists = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model.cards(), 'remove', this.removePhotoView);
    this.listenTo(this.model.cards(), 'add', this.addCardView);
    this.model.cards().each(this.addCardView.bind(this));
  },

  events: {
    "click .delete-list": "deleteList",
    "click .remove-card": "removeCard",
    "click .create-card-form": "createCardForm",
    "click .create-card": "createCard",
    "click .close-card-form": "removeCardForm",
    "mousedown .card": "addDraggedClass",
  },

  addDraggedClass: function (event) {
    event.stopPropagation();
    $(event.currentTarget).addClass("dragged");
    $(event.currentTarget).mouseup(function() {
      $(this).removeClass("dragged");
    })
  },

  tagName: "li",
  className: "list",

  template: JST["list/show"],

  removeCardButtonTemplate: JST["card/remove_card_button"],
  newCardTemplate: JST["card/new"],
  newCardButtonTemplate: JST["card/new_card_button"],

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  deleteList: function (event) {
    event.preventDefault;
    var ask = confirm("Are you sure you want to delete this List?");
    if(ask){
      this.model.destroy();
    }
  },

  addCardView: function (card) {
    var subview = new TrelloClone.Views.Cards ({ model: card });
    this.addSubview('.cards', subview);
  },

  removeCard: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("id");
    var card = this.model.cards().get(id);
    card.destroy();
  },

  removePhotoView: function (card) {
    this.removeModelSubview('.cards', card);
  },

  createCardForm: function (event) {
    event.preventDefault();
    var content = this.newCardTemplate({ list: this.model });
    this.$el.find(".new-card").html(content);
  },

  createCard: function (event) {
    event.preventDefault();
    var attr = $(".new-card-form").serializeJSON();
    var model = new TrelloClone.Models.Card();
    var cards = this.model.cards();

    model.set(attr.card);
    model.save({}, {
      success: function () {
        cards.add(model);
        this.removeCardForm();
      }.bind(this)
    });
  },

  removeCardForm: function (event) {
    event && event.preventDefault();
    var content = this.newCardButtonTemplate();
    $(".new-card").html(content);
  }
});
