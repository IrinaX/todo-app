<template>
  <div class="todo">
    <div class="container">
      <h1 class="todo__title">Todo App</h1>
      <div class="todo__body">
        <div class="todo__item"
             v-for="(task, key) in d_taskList"
        >
          <label class="checkbox__label">
            {{ task.text }}
            <input type="checkbox" class="checkbox__input"
                   @click="selectTask(key)"
            >
            <span class="checkbox__icon"></span>
          </label>
        </div>
        <div class="todo__btns">
          <button class="button btn_add"
                  @click="showModal"
          ></button>
<!--          <button class="button btn_delete"-->
<!--                  @click="deleteTask(d_taskList,d_checkedTasks)"-->
<!--          ></button>-->
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
          <textarea class="todo__textarea" v-model="d_newTodo" placeholder="Type your new task..." rows="10"></textarea>
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
      d_checkedTasks: [],
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
          text: this.d_newTodo,
          done: false,
        });
      }
      this.d_newTodo = null;
      this.d_modalActive = false;
      document.documentElement.style.overflowY = "auto";
    },
    selectTask(key) {
      console.log(key);
      this.d_checkedTasks.push(key);
    },
    deleteTask(arr, indexes) {
      this.d_taskList = arr.sort().filter(function (e, i) {
        return indexes.indexOf(i) < 0;
      });

    },
  },
}
;
</script>

<style lang="scss">
.todo {
  padding: 30px 0;

  &__title {
    text-align: center;
    color: #4A4A4A;
    margin-bottom: 21px;
  }

  &__item {
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    padding: 15px;
    margin-bottom: 21px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btns {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.checkbox__icon {
  align-self: baseline;
  position: relative;

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
    box-shadow: 0 2px 13px 1px rgba(0, 0, 0, 0.25);
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
  background: $primary;
}

.button {
  background: $secondary;
  position: relative;
  color: white;
  font: $button-font;
  border: none;
  box-shadow: $card-shadow;
  border-radius: 50px;
  padding: 10px;
  z-index: 1;
  cursor: pointer;
  transition: all .1s ease-in;

  &:active {
    transform: scale(.8);
    box-shadow: 0 0 0 rgba(15, 40, 94, 0.18);
  }

  &:active, &:focus {
    outline: none;
  }

  &:hover {
    background: darken($secondary, 20%);
  }
}

.btn_add, .btn_close, .btn_delete {
  width: 41px;
  height: 41px;

  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    display: block;
    width: 21px;
    height: 21px;
  }
}

.btn_add {
  &:after {
    background: url('../components/VButton/plus.svg') center no-repeat;
  }
}

.btn_delete {
  &:after {
    background: url('../components/VButton/delete.svg') center no-repeat;
  }
}

.btn_close {
  &:after {
    background: url('../components/VButton/plus.svg') center no-repeat;
    transform: rotate(45deg);
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
