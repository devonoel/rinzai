var app = new Vue({
  el: '#todos',
  data: {
    todos: [],
    newTodo: '',
    result: '',
    loaded: false
  },

  mounted: function() {
    var that = this;
    axios.get('/todos')
      .then(function(res) {
        that.todos = res.data.todos;
        that.loaded = true;
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

    complete: function(id) {
      var t = this.todos.find(function(e) {
        return e.id === parseInt(id)
      });

      axios.put('/todos/' + id, {
          complete: t.complete
        })
        .then(function(res) {
          t = res.data.todo;
        })
        .catch(function(err) {
          console.error(err);
        });
    },

    remove: function(id) {
      var that = this;
      axios.delete('/todos/' + id)
        .then(function(res) {
          that.todos = res.data.todos;
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
