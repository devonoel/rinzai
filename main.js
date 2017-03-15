var app = new Vue({
  el: '#todos',
  data: {
    todos: ['Do thing', 'Do other thing'],
    newTodo: '',
    result: ''
  },

  methods: {
    add: function() {
      var e = this.newTodo;
      if (!e) return;
      this.todos.push(e);
    },

    getRandom: function() {
      this.result = "Result: " + this.todos[Math.floor(Math.random() * this.todos.length)];
    }
  }
});
