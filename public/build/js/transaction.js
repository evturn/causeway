module.exports = {
  $amount: $('.transaction__field-amount'),
  $checkboxs: $('.transaction__user-checkbox'),
  $info: $('.transaction__info'),
  checked: 0,
  init() {
    this.$checkboxs.on('click', (e) => {
      this.counter();
    });
  },
  counter() {
    let checked = 0;
    let total = this.$checkboxs.length;
    $.each(this.$checkboxs, function() {
      let isChecked = $(this).is(':checked');
      if (isChecked) {
        ++checked;
      }
    });
    this.checked = checked;
    if (this.checked > 1) {
      this.updateBrowserCounter();
    }
    if (this.checked <= 1) {
      this.removeBrowserCounter();
    }
  },
  removeBrowserCounter() {
    this.$info.empty();
  },
  updateBrowserCounter() {
    this.$info.html(`Split ${this.checked} ways`)
  }
};