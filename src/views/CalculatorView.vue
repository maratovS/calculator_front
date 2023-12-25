<template>
  <div class="calculator">
    <form class="calculator__form">
      <div class="calculator__select-field">
        <label>Выберите систему счисления:</label>
        <the-select @change="chosen" :options="systemOptions" id="system-select"/>
      </div>
      <div class="calculator__inputs-field">
        <label for="first-num">Введите первое число:</label>
        <the-input type="text" id="first-num" class="calculator__input"
                   :system="system"
                   :operation="dataForCalculation.operation"
                   v-model="dataForCalculation.firstNum" />
        <label for="second-num">Введите второе число:</label>
        <the-input type="text" id="second-num" class="calculator__input"
                   :system="system"
                   :operation="dataForCalculation.operation"
                   v-model="dataForCalculation.secondNum" />
      </div>
      <div class="select-with-button">
        <div class="calculator__select-field">
          <label>Выберите операцию:</label>
          <the-select :options="operationOptions" @change="chosen" id="operation-select" />
        </div>
        <the-button @click="submit" id="get-result">Вычислить</the-button>
      </div>
      <div class="calculator__result" v-color>
        {{dataForCalculation.result}}
      </div>
      <the-button @click="clear" id="clear">Очистить</the-button>
    </form>
  </div>
</template>

<script>

import CalculatorDataService from "../services/CalculatorDataService";
import {color} from "../directives/VColor";
import TheInput from "../components/TheInput.vue";
import truncateDecimals from "../filters/truncateDecimals";
import TheButton from "../components/TheButton.vue";
import TheSelect from "../components/TheSelect.vue";

export default {
  name: 'CalculatorView',
  components: {TheSelect, TheButton, TheInput},
  directives: {
    color
  },
  data() {
    return {
      id: null,
      dataForCalculation: {
        firstNum: "",
        firstNumSystem: "",
        secondNum: "",
        secondNumSystem: "",
        operation: "",
        result: 0,
        executionTime: "",
      },
      num: 23423.2343,
      result: "",
      system: "",
      calculations: [],
      systemOptions: [2, 8, 10, 16],
      operationOptions: ["*", "÷", "-", "+"]
    }
  },
  methods: {
    chosen(event) {
      if (!isNaN(event.target.value))
        this.system = event.target.value
      else
        this.dataForCalculation.operation = event.target.value
    },
    clear() {
      this.dataForCalculation.firstNum = ''
      this.dataForCalculation.secondNum = ''
    },

    async submit() {
      this.dataForCalculation.executionTime = (new Date()).toISOString()
      console.log(this.dataForCalculation.executionTime)
      this.dataForCalculation.firstNumSystem = this.dataForCalculation.secondNumSystem = Number(this.system)

      CalculatorDataService.create(this.dataForCalculation)
        .then(response => {
          this.dataForCalculation = response.data
        })
        .catch( e => {
          alert(e)
        })
    },
    truncateDecimals: truncateDecimals.truncateDecimals
  },
}
</script>

<style lang="scss" scoped>

.calculator {
  display: flex;
  column-gap: 40px;
}

.calculator__form {
  width: 400px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
  margin: 40px;
}

.select-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calculator__select-field {
  display: flex;
  align-items: center;
  column-gap: 10px;
  background-position: calc(20px);
}

.calculator__inputs-field {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.calculator__get-calculations {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border-top: 1px solid $dark_accent;
  padding-top: 20px;
}

.calculator__get-by-id {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calculator__input {
  padding: 8px;
  border: 1px solid $accent;
  border-radius: 4px;
  background-color: $light;
  &:focus {
    border: 1px solid $light_accent;
    box-shadow: inset 0 0 8px 2px rgba(0, 0, 0, .2);
  }
}

.calculator__result {
  padding: 8px;
  border: 1px solid $accent;
  border-radius: 4px;
  background-color: $light;
  &:focus {
    border: 1px solid $light_accent;
    box-shadow: inset 0 0 8px 2px rgba(0, 0, 0, .2);
  }
}
</style>
