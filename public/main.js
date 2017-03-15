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
        console.error(err);
      })
  },

  methods: {
    add: function() {
      var that = this;
      if (!this.newTodo) return;
      axios.post('/todos', {
          todo: this.newTodo
        })
        .then(function(res) {
          if (res.status === 200) {
            that.todos = res.data.todos;
            that.newTodo = '';
          }
        })
        .catch(function(err) {
          console.error(err);
        });
    },

    getRandom: function() {
      this.result = "Result: " + this.todos[Math.floor(Math.random() * this.todos.length)].message;
    }
  }
});
