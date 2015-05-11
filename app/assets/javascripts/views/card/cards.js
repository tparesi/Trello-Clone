TrelloClone.Views.Cards = Backbone.View.extend({
  tagName: "li",
  className: "card group",

  template: JST["card/show"],

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }
});
