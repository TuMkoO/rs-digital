<template>
  <main>
    <section class="main">
      <div class="container">
        <div class="d-flex justify-content-between flex-column-sm">
          <div class="sidebar">
            <HotelsFilter
              v-model="filter"
              ref="hotelsFilterComponent"
              @filtration="filtration"
            />
          </div>

          <div class="content">
            <HotelsList
              v-if="filteredHotels && filteredHotels.length"
              :values="filteredHotels"
              :perPage="3"
            />
            <div v-else class="not-found border-grey rounded-15 text-center">
              <img src="../assets/img/404.svg" alt="" />
              <p>По данным параметрам ничего не найдено</p>
              <span>
                Попробуйте изменить параметры фильтрации или вернуться в общий
                каталог
              </span>
              <button @click="onClearFilter" class="btn btn-purple-100">
                Очистить фильтр
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import HotelsList from "../components/HotelsList.vue";
import HotelsFilter from "../components/HotelsFilter.vue";

export default {
  components: { HotelsList, HotelsFilter },
  setup() {
    const store = useStore();

    //параметры фильтра
    const filter = ref({});

    //фильтрованный список
    const filteredHotels = ref();

    //компонент фильтра
    const hotelsFilterComponent = ref();

    //полный список
    const hotels = computed(() => store.getters["hotels"].hotels);

    onMounted(() => {
      filteredHotels.value = hotels.value;
    });

    //фильтрация спичка
    const filtration = () => {
      filteredHotels.value = hotels.value;

      filteredHotels.value = filteredHotels.value
        .filter((hotel) => {
          if (filter.value.country) {
            return hotel.country
              .toLowerCase()
              .includes(filter.value.country.toLowerCase());
          }
          return true;
        })
        .filter((hotel) => {
          if (filter.value.types && filter.value.types.length) {
            return filter.value.types.includes(hotel.type);
          }
          return true;
        })
        .filter((hotel) => {
          if (filter.value.stars && filter.value.stars.length) {
            return filter.value.stars.includes(hotel.stars + "");
          }
          return true;
        })
        .filter((hotel) => {
          if (filter.value.reviews) {
            return filter.value.reviews < hotel.reviews_amount;
          }
          return true;
        })
        .filter((hotel) => {
          if (filter.value.price && filter.value.price.length == 2) {
            return (
              hotel.min_price >= filter.value.price[0] &&
              hotel.min_price <= filter.value.price[1]
            );
          }
          return true;
        });
    };

    //очистка фильтра
    const onClearFilter = () => {
      hotelsFilterComponent.value.clearFilter();
    };

    return {
      hotels,
      filteredHotels,
      filter,
      filtration,
      onClearFilter,

      hotelsFilterComponent,
    };
  },
};
</script>

<style></style>
