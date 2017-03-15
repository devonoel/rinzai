var app = new Vue({
  el: '#todos',
  data: {
    todos: [],
    newTodo: '',
    result: ''
  },

  mounted: function() {
    var that = this;
    axios.get('/todos')
      .then(function(res) {
        that.todos = res.data.todos;
      })
      .catch(function(err) {
        console.log(err);
      })
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
