<template>
  <div class="todo">
    <div class="container">
      <div class="todo__body">
        <div class="todo__get-started"
             v-if="d_taskList.length===0"
        >
          <img src="./getStartedImg.png" alt="" class="mr-4 mb-3">
          <div>Add a task to get started</div>
        </div>
        <div class="todo__item"
             v-for="(task, key) in d_taskList"
        >

          <label class="checkbox__label">
            <span class="d-flex align-items-center">
            <span class="todo__item-checkbox">
              <input type="checkbox" class="checkbox__input"
                     @click="task.done = !task.done"
              >
              <span class="checkbox__icon"></span>
            </span>
            <span class="mr-3"
                  :class="{'todo__item-done': task.done}"
                  v-html="task.text"
            >
<!--              {{ task.text }}-->
            </span>
            </span>
            <button class="button btn_delete"
                    v-if="task.done"
                    @click="deleteTask(key)"
            ></button>
          </label>
        </div>
        <div class="btn_add-wrap">
          <button class="button btn_add"
                  @click="showModal"
          ></button>
        </div>
        <div class="modal-fade"
             v-if="d_modalActive"
             @click="d_modalActive=false"
        ></div>
        <div class="modal-add"
             v-if="d_modalActive"
        >
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h2 class="modal-add__title">Add New Task</h2>
            <button class="button btn_close"
                    @click="d_modalActive=false"
            ></button>
          </div>
          <textarea class="todo__textarea" placeholder="Type your new task..." rows="10"
                    v-model="d_newTodo"
          ></textarea>
          <button class="button btn_submit"
                  @click="addNewTask"
          >Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "~/components/VButton/VButton";
import VCheckbox from "~/components/VCheckbox/VCheckbox";

export default {
  components: {
    VButton,
    VCheckbox
  },
  data() {
    return {
      d_modalActive: false,
      d_newTodo: null,
      d_newTodoComputed:null,
      d_taskList: [
        {
          text: "Create new project",
          done: false
        },
        {
          text: "Create new project2",
          done: false
        },
      ]
    };
  },
  methods: {

    showModal() {
      document.documentElement.style.overflowY = "hidden";
      this.d_modalActive = true;
    },
    addNewTask() {
      if (this.d_newTodo) {
        this.d_taskList.push({
          text: this.d_newTodo.replace(/\n/g, "<br>"),  //c_newTodo
          done: false,
        });
      }
      console.log(this.d_newTodo);
      this.d_newTodo = null;
      this.d_modalActive = false;
      document.documentElement.style.overflowY = "auto";

    },
    selectTask(task) {
      console.log(task);
// task.style.textDecoration='underline';
    },
    deleteTask(key) {
      this.d_taskList.splice(key, 1);
    },
  },




};
</script>

<style lang="scss">
.todo {
  padding: 30px 0 145px;

  &__get-started {
    position: absolute;
    top: 45%;
    transform: translateY(-140px);
    text-align: center;
    left: 0;
    right: 0;
  }


  &__item {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;

    &-done {
      text-decoration: line-through;
      color: #999797;
      font-weight: 300;
    }

    &-checkbox {
      width: fit-content;
      display: flex;
      justify-content: space-between;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.checkbox__input {
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.checkbox__label {
  overflow-wrap: anywhere;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.checkbox__icon {
  align-self: baseline;
  position: relative;
  margin: auto;
  margin-right: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 7px;
    display: block;
    background: url('../components/VCheckbox/checkbox.svg') center no-repeat;
    width: 8px;
    height: 11px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &::after {
    content: '';
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50px;
    border: none;
    background: $light;
    transition: all .1s ease-in;
  }
}

.checkbox__input:checked + .checkbox__icon::before {
  opacity: 1;
}

.checkbox__input:checked + .checkbox__icon::after {
  background: $success;
}

.button {
  background: aqua;
  position: relative;
  color: white;
  font: $button-font;
  border: none;
  box-shadow: none;
  border-radius: 50px;
  z-index: 1;
  cursor: pointer;
  transition: all .1s ease;

  &:active {
    transform: scale(.8);
    box-shadow: 0 0 0 rgba(15, 40, 94, 0.18);
  }

  &:active, &:focus {
    outline: none;
  }


}

.btn_add-wrap {
  content: '';
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 150px;
  background: linear-gradient(180.03deg, rgba(240, 240, 240, 0) 0.03%, #F0F0F0 71.92%);
}

.btn_add {
  width: 62px;
  height: 62px;
  position: fixed;
  bottom: 50px;
  left: 50%;
  margin-left: -31px;
  box-shadow: $card-shadow;
  background: $primary;

  &:hover {
    background: darken($primary, 20%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 17px;
    left: 17px;
    display: block;
    width: 29px;
    height: 29px;
    background: url('../components/VButton/plus.svg') center no-repeat;
  }
}

.btn_delete {
  background: $danger;
  min-width: 22px;
  height: 22px;

  &:hover {
    background: darken($danger, 20%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 6.33px;
    left: 6.33px;
    display: block;
    width: 9.34px;
    height: 9.36px;
    background: url('../components/VButton/delete.svg') center no-repeat;
  }
}

.btn_submit {
  display: block;
  margin: 0 0 0 auto;
  border-radius: 10px;
}

.modal-fade {
  &:before {
    content: '';
    background: #000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 1;
  }
}

.modal-add {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 5;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 300px;
  width: 450px;
  margin: auto;
  bottom: 0;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  padding: 20px;
  background: $light;

  @include media-breakpoint-down(xs) {
    width: 100%;
  }

  &__title {
    margin-bottom: 0;
  }

  .todo__textarea {
    margin-bottom: 15px;
    width: 100%;
    border: none;
    resize: none;
    outline: none;

    &::-webkit-scrollbar { /* 1 - скроллбар */
      width: 4px;
      height: 4px;
      background-color: #FFFFFF;
    }

    &::-webkit-scrollbar-thumb { /* 5 - ползунок */
      border-radius: 2px;
      background-color: #d1d1d1;
    }
  }

}
</style>
