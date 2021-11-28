<template>
  <div>
    <h1>
        Todo list
    </h1>

    <ul>
        <li
        v-for="(item, index) in todos"
        v-bind:key="item.id"
        v-bind:data-id="item.id"
        v-on:click="onItemClick(item.id)"
        >
        {{item.id}} {{item.text}}
        </li>
    </ul>


  </div>
</template>

<script>

export default {
  name: 'todolist',
  components: {
  },
  data(){
      return{
          todos:[]
      }
  },
  mounted(){
      this.loadTodos('http://localhost:3000/todos');
  },
  methods:{
      loadTodos(path){
          fetch(path)
          .then((response)=>{
            //console.log("response", response);
            return response.json();
          })
          .then((data)=>{
            this.todos=data;
            console.log("data", data);
          })
          .catch((error)=>{
              console.log("error", error);
          });
      },
      onItemClick(id){
          console.log("id", id);
      }
  }
}
</script>
