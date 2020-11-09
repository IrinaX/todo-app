<template>
  <div class="todo">
    <div class="container">
      <div class="todo__body">
        <transition name="fade">
          <div class="todo__get-started"
               v-show="d_newTodo === null && d_taskList.length===0"
          >
            <img src="./getStartedImg.png" alt="" class="mr-4 mb-3">
            <div>Add a task to get started</div>
          </div>
        </transition>
        <div class="todo__item"
             v-for="(task, index) in d_taskList"
             :key="index"
        >
          <label class="checkbox__label">
            <span class="d-flex align-items-center">
            <span class="todo__item-checkbox">
              <input type="checkbox" class="checkbox__input"

                     v-model="task.done"
              >
              <span class="checkbox__icon"></span>
            </span>
            <span :class="{'todo__item-done': task.done}"
                  v-html="task.text"
            >
            </span>
            </span>
          </label>
          <button class="button btn_delete"
                  v-show="task.done"
                  @click="deleteTask(index)"
          ></button>
        </div>
        <div class="btn_add-wrap">
          <button class="button btn_add"
                  @click="showModal"
          ></button>
        </div>
        <transition name="fade">
          <div class="modal-add"
               v-if="d_modalActive"
          >
            <div class="modal-add__btn-group">
              <button class="button btn_back"
                      @click="closeModal"
              >
                <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M26.5802 7.97592C26.5802 8.13857 26.5186 8.29456 26.4089 8.40956C26.2993 8.52457 26.1507 8.58918 25.9956 8.58918L1.99568 8.58919L8.01218 14.9015C8.06718 14.9583 8.11092 15.0259 8.14087 15.1005C8.17083 15.1751 8.1864 15.2552 8.18671 15.3362C8.18701 15.4171 8.17204 15.4973 8.14265 15.5722C8.11326 15.647 8.07003 15.7151 8.01546 15.7723C7.96089 15.8295 7.89607 15.8749 7.82471 15.9057C7.75336 15.9365 7.6769 15.9522 7.59974 15.9519C7.52258 15.9515 7.44625 15.9352 7.37515 15.9037C7.30404 15.8723 7.23958 15.8264 7.18547 15.7686L0.171181 8.40951C0.11691 8.35257 0.0738599 8.28497 0.0444886 8.21058C0.0151173 8.13619 0 8.05645 0 7.97593C0 7.89541 0.0151173 7.81567 0.0444886 7.74128C0.0738599 7.66689 0.11691 7.59929 0.171181 7.54236L7.18547 0.183217C7.23958 0.125503 7.30404 0.0795989 7.37515 0.0481539C7.44625 0.0167088 7.52258 0.000344526 7.59974 5.38187e-06C7.6769 -0.000333762 7.75336 0.0153589 7.82471 0.0461779C7.89607 0.0769968 7.96089 0.122332 8.01546 0.179569C8.07003 0.236806 8.11326 0.304812 8.14265 0.379664C8.17204 0.454516 8.18701 0.534732 8.18671 0.615686C8.1864 0.69664 8.17083 0.77673 8.14087 0.851336C8.11092 0.925941 8.06718 0.993586 8.01218 1.05037L1.99568 7.36267L25.9956 7.36266C26.1507 7.36266 26.2993 7.42727 26.4089 7.54228C26.5186 7.65729 26.5802 7.81328 26.5802 7.97592Z"
                  />
                </svg>
              </button>
              <button class="button btn_submit"
                      @click="addNewTask"
                      v-if="d_newTodo"
              >
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.22538 15.9519L0.185358 7.89882C0.0590712 7.75098 -0.00691871 7.5608 0.00057489 7.36629C0.00806849 7.17178 0.0884937 6.98728 0.225779 6.84964C0.363064 6.712 0.547098 6.63137 0.741103 6.62385C0.935109 6.61634 1.1248 6.6825 1.27226 6.80911L8.20996 13.7647L21.7693 0.185836C21.9168 0.0592236 22.1065 -0.00693657 22.3005 0.000576373C22.4945 0.00808931 22.6785 0.088722 22.8158 0.226361C22.9531 0.364001 23.0335 0.548509 23.041 0.743015C23.0485 0.937522 22.9825 1.1277 22.8562 1.27555L8.22538 15.9519Z"
                  />
                </svg>
              </button>
            </div>
            <textarea class="todo__textarea" placeholder="What should be done?"
                      v-model="d_newTodo"
            ></textarea>
          </div>
        </transition>
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
      d_taskList: [
        {
          text: "Create new project",
          done: false,
        },
        {
          text: "Create new project2",
          done: false,
        },
      ]
    };
  },
  methods: {
    showModal() {
      document.documentElement.style.overflowY = "hidden";
      this.d_modalActive = true;
      console.log(this.d_taskList);
    },
    closeModal() {
      document.documentElement.style.overflowY = "auto";
      this.d_modalActive = false;
      this.d_newTodo = null;
    },
    addNewTask() {
      if (this.d_newTodo) {
        this.d_taskList.push({
          text: this.d_newTodo.replace(/\n/g, "<br>"),
          done: false,
        });
      }
      this.d_newTodo = null;
      this.d_modalActive = false;
      document.documentElement.style.overflowY = "auto";
    },
    deleteTask(key) {
      this.d_taskList.splice(key, 1);
      this.d_newTodo = null;
    },
  },


};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.todo {
  padding: 30px 0 145px;

  &__get-started {
    position: absolute;
    top: 45%;
    transform: translateY(-140px);
    text-align: center;
    left: 0;
    right: 0;
    font-size: 18px;
    font-weight: 300;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  width: 100%;
  margin-right: 15px;
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
    top: 7px;
    left: 6px;
    display: block;
    background: url('../components/VCheckbox/checkbox.svg') center no-repeat;
    width: 11px;
    height: 9px;
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
  background: transparent;
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
  z-index: 4;
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
  padding: 0;

  &:hover {
    background: darken($danger, 20%);
  }

  &:after {
    content: '';
    margin: 0 auto;
    display: block;
    width: 10px;
    height: 10px;
    background: url('../components/VButton/delete.svg') center no-repeat;
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
    height: 100%;
    box-shadow: none;
    border-radius: 0;
    padding: 30px;
  }

  &__btn-group {
    display: flex;
    margin-bottom: 30px;

    .btn_back,
    .btn_submit {
      padding: 0;

      path {
        fill: $dark;
      }
    }

    .btn_submit {
      margin: 0 0 0 auto;
    }
  }

  .todo__textarea {
    width: 100%;
    border: none;
    resize: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: 100%;
    background: transparent;
    caret-color: #ffa000;
    font-size: 18px;
    line-height: 120%;
    color: $dark;

    &::placeholder {
      font-weight: 300;
      color: rgba($dark, .8);
    }

    &::-webkit-scrollbar { /* 1 - скроллбар */
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb { /* 5 - ползунок */
      border-radius: 2px;
      background-color: #d1d1d1;
    }
  }
}
</style>
