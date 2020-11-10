<template>
  <div class="todo">
    <div class="container">
      <div class="todo__body">
        <transition name="fade">
          <div class="todo__get-started"
               v-show="d_newTodo === null && d_taskList.length===0"
          >
            <img src="./getStartedImg.png" alt="">
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
          <transition name="fade">
          <button class="button btn_delete"
                  v-show="task.done"
                  @click="deleteTask(index)"
          ></button>
          </transition>
        </div>
        <transition name="fade">
          <div class="btn_add-wrap"
               v-if="d_modalActive===false"
          >
            <button class="button btn_add"
                    @click="showModal"
            ></button>
          </div>
        </transition>
        <transition name="fade">
          <div class="modal-fade"
               v-if="d_modalActive"
               @click="d_modalActive=false"
          ></div>
        </transition>
        <transition name="fade">

          <div class="modal-add"
               v-if="d_modalActive"
          >
            <div class="modal-add__btn-group">
              <button class="button btn_back"
                      @click="closeModal"
              >
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.594582 8C0.594582 7.45258 1.04902 7.00881 1.6096 7.00881H26.985C27.5456 7.00881 28 7.45258 28 8C28 8.54742 27.5456 8.99119 26.985 8.99119H1.6096C1.04902 8.99119 0.594582 8.54742 0.594582 8Z" fill="black"/>
                  <path d="M0.297291 8.70088C-0.099097 8.31379 -0.099097 7.6862 0.297291 7.29912L7.47453 0.290314C7.87092 -0.0967715 8.51359 -0.0967713 8.90998 0.290314C9.30637 0.6774 9.30637 1.30499 8.90998 1.69208L1.73274 8.70088C1.33635 9.08797 0.693679 9.08797 0.297291 8.70088Z" fill="black"/>
                  <path d="M0.297291 8.70088C-0.099097 8.31379 -0.099097 7.6862 0.297291 7.29912C0.693679 6.91203 1.33635 6.91203 1.73274 7.29912L8.90998 14.3079C9.30637 14.695 9.30637 15.3226 8.90998 15.7097C8.51359 16.0968 7.87092 16.0968 7.47453 15.7097L0.297291 8.70088Z" fill="black"/>
                </svg>
              </button>
              <button class="button btn_submit"
                      @click="addNewTask"
                      v-show="d_newTodo"
              >
                <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.298185 6.03802C0.695765 5.6349 1.34037 5.6349 1.73795 6.03802L11.1093 15.5401L9.6695 17L0.298185 7.49788C-0.0993954 7.09475 -0.0993945 6.44115 0.298185 6.03802Z" fill="black"/>
                  <path d="M8.23402 15.5401L23.2621 0.302347C23.6596 -0.100782 24.3042 -0.100783 24.7018 0.302347C25.0994 0.705476 25.0994 1.35908 24.7018 1.76221L9.67378 17L8.23402 15.5401Z" fill="black"/>
                </svg>
              </button>
            </div>
            <textarea v-focus class="todo__textarea" placeholder="What should be done?"
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
      d_taskList: [],
    };
  },
  methods: {
    showModal() {
      document.documentElement.style.overflowY = "hidden";
      this.d_modalActive = true;
      document.addEventListener("backbutton", onBackKeyDown, false);
      function onBackKeyDown(e) {
        e.preventDefault();
        alert('Back Button is Pressed!');
        this.closeModal();
      }
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
        this.d_newTodo = null;
      }
      this.d_modalActive = false;
      document.documentElement.style.overflowY = "auto";
    },
    deleteTask(key) {
      this.d_taskList.splice(key, 1);
      this.d_newTodo = null;
    },
  },
  directives: {
    focus: {
      // определение директивы
      inserted: function (el) {
        el.focus()
      }
    }
  }

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

    img {
      width: 270px;
      margin: 0 25px 16px 0;
      @media (prefers-color-scheme: dark) {
        opacity: .8;
      }
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;

    @media (prefers-color-scheme: dark) {
      background: $dDark;
      color: $white;
    }

    &-done {
      text-decoration: line-through;
      color: $notActive;
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
    @media (prefers-color-scheme: dark) {
      background: $dCheckNotActive;
    }
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
  }

  &:active, &:focus {
    outline: none;
  }
}

.btn_add-wrap {
  content: '';
  position: fixed;
  z-index: 2;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 150px;
  background: $gradient;
  @media (prefers-color-scheme: dark) {
    background: $dGradient;
  }
}

.btn_add {
  width: 63px;
  height: 63px;
  position: fixed;
  bottom: 50px;
  left: 50%;
  margin-left: -31px;
  background: $primary;

  &:hover {
    background: darken($primary, 10%);
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
    z-index: 5;
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
  height: 700px;
  width: 950px;
  margin: auto;
  bottom: 0;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  padding: 30px;
  background: $light;
  @media (prefers-color-scheme: dark) {
    background: $black;
  }

  @include media-breakpoint-down(md) {
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
        fill: $black;
        @media (prefers-color-scheme: dark) {
          fill: $primary;
        }
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
    caret-color: $primary;
    font-size: 18px;
    line-height: 120%;
    color: $notActive;
    @media (prefers-color-scheme: dark) {
      color: $light;
    }
    &::placeholder {
      font-weight: 300;
      color: rgba($notActive, .8);
      @media (prefers-color-scheme: dark) {
        color: $notActive;
        font-weight: 400;
      }
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
