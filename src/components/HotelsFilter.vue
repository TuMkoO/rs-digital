<template>
  <div class="filters">
    <div class="sidebar-item">
      <h3>Страна</h3>
      <va-select
        :options="optionsCountry"
        v-model="countryValue"
        placeholder="Поиск стран"
        noOptionsText="К сожалению, по вашему запросу ничего не найдено :("
        outline
        searchable
      >
        <template #prependInner>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="6.25" stroke="black" stroke-width="1.5" />
            <rect
              x="10.5"
              y="11.8"
              width="1.5"
              height="7"
              rx="0.75"
              transform="rotate(-45 10.5 11.8)"
              fill="black"
            />
          </svg>
        </template>
      </va-select>
    </div>
    <div class="sidebar-item">
      <h3>Тип</h3>
      <va-select
        :options="optionsType"
        placeholder="Тип"
        v-model="typeValue"
        multiple
        outline
      />
    </div>
    <div class="sidebar-item">
      <h3>Количество звёзд</h3>
      <div class="border-grey rounded-10 py-25 px-20">
        <div>
          <va-checkbox
            class="mb-15"
            color="#00BB6D"
            label="1 звезда"
            array-value="1"
            v-model="stars"
          />
          <va-checkbox
            class="mb-15"
            color="#00BB6D"
            label="2 звезды"
            array-value="2"
            v-model="stars"
          />
          <va-checkbox
            class="mb-15"
            color="#00BB6D"
            label="3 звезды"
            array-value="3"
            v-model="stars"
          />
          <va-checkbox
            class="mb-15"
            color="#00BB6D"
            label="4 звезды"
            array-value="4"
            v-model="stars"
          />
          <va-checkbox
            color="#00BB6D"
            label="5 звезд"
            array-value="5"
            v-model="stars"
          />
        </div>
      </div>
    </div>
    <div class="sidebar-item">
      <h3>Количество отзывов (от)</h3>
      <input
        type="number"
        placeholder="Например, от 10"
        v-model="reviews"
        min="0"
      />
    </div>
    <div class="sidebar-item">
      <h3>Цена</h3>
      <div>
        <div class="d-flex align-items-center mb-25">
          <input
            class=""
            type="number"
            min="0"
            max="10000"
            v-model="minValue"
            @change="onChangeMin"
          />
          <span class="px-20"> — </span>
          <input
            class=""
            type="number"
            min="0"
            max="10000"
            v-model="maxValue"
            @change="onChangeMax"
          />
        </div>
        <Slider
          v-model="priceValue"
          tooltipPosition="bottom"
          :step="1"
          :max="10000"
          :format="rangeFormat"
          @change="onChangePrice"
        />
      </div>
    </div>
    <div class="sidebar-item">
      <button type="button" class="btn btn-purple mb-15" @click="onApplyFilter">
        Применить фильтр
      </button>
      <button @click="clearFilter" type="button" class="btn">
        Очистить фильтр
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Slider from "@vueform/slider";

export default {
  emits: ["update:modelValue", "filter", "filtration"],
  props: ["modelValue"],
  components: { Slider },
  setup(_, { emit }) {
    //опции списков фильтрации
    const optionsCountry = ["Австрия", "Греция", "Дания"];
    const optionsType = ["Апартаменты", "Отель"];

    //значения фильтров
    const stars = ref();
    const reviews = ref();
    const countryValue = ref();
    const typeValue = ref();
    const minValue = ref(0);
    const maxValue = ref(10000);
    const priceValue = ref([0, 10000]);

    //форматирование значений tooltip в range slider
    const rangeFormat = (value) => {
      return `${Math.round(value)} ₽`;
    };

    //изменение input min
    const onChangeMin = () => {
      if (minValue.value > maxValue.value) {
        minValue.value = maxValue.value;
      }
      priceValue.value[0] = minValue.value;
    };

    //изменение input max
    const onChangeMax = () => {
      if (maxValue.value < minValue.value) {
        maxValue.value = minValue.value;
      }
      priceValue.value[1] = maxValue.value;
    };

    //изменение range slider
    const onChangePrice = (value) => {
      minValue.value = value[0];
      maxValue.value = value[1];
    };

    //применить фильтр
    const onApplyFilter = () => {
      emit("update:modelValue", {
        country: countryValue.value,
        types: typeValue.value,
        stars: stars.value,
        price: [minValue.value, maxValue.value],
        reviews: reviews.value,
      });

      emit("filter");
      emit("filtration");
    };

    //очистить фильтр
    const clearFilter = () => {
      stars.value = undefined;
      reviews.value = undefined;
      countryValue.value = undefined;
      typeValue.value = undefined;
      minValue.value = 0;
      maxValue.value = 10000;
      priceValue.value = [0, 10000];

      emit("update:modelValue", {
        country: countryValue.value,
        types: typeValue.value,
        stars: stars.value,
        price: [minValue.value, maxValue.value],
        reviews: reviews.value,
      });

      emit("filter");
      emit("filtration");
    };

    return {
      optionsCountry,
      optionsType,
      stars,
      reviews,
      typeValue,
      countryValue,
      priceValue,
      minValue,
      maxValue,

      rangeFormat,

      onChangeMin,
      onChangeMax,
      onChangePrice,
      onApplyFilter,

      clearFilter,
    };
  },
};
</script>

<style></style>
