<template>
  <div class="accodion">
    <h4>The Team:</h4>

    <div class="accodion-item">
      <p @click="setActive('founder')">Co-Founder</p>
      <transition name="fade">
        <accordion-item v-if="active === 'founder'">
          <div class="accodion-item-slot">
            <p>Danielle Ezra | Co-Founder</p>
            <p>Tel: +972-3-5555555</p>
            <p>Mob: +972-50-5555555</p>
            <p>E-mail: user@toy-store.org.il</p>
          </div>
        </accordion-item>
      </transition>
    </div>

    <div class="accodion-item">
      <p @click="setActive('president')">Co-President</p>
      <transition name="fade">
        <accordion-item v-if="active === 'president'">
          <div class="accodion-item-slot">
            <p>Danielle Ezra | Co-President</p>
            <p>Tel: +972-3-5555555</p>
            <p>Mob: +972-50-5555555</p>
            <p>E-mail: user@toy-store.org.il</p>
          </div>
        </accordion-item>
      </transition>
    </div>

    <div class="accodion-item">
      <p @click="setActive('CEO')">CEO</p>
      <transition name="fade">
        <accordion-item v-if="active === 'CEO'">
          <div class="accodion-item-slot">
            <p>Danielle Ezra | CEO</p>
            <p>Tel: +972-3-5555555</p>
            <p>Mob: +972-50-5555555</p>
            <p>E-mail: user@toy-store.org.il</p>
          </div>
        </accordion-item>
      </transition>
    </div>

    <div class="accodion-item">
      <p @click="setActive('coordinator')">Coordinator</p>
      <transition name="fade">
        <accordion-item v-if="active === 'coordinator'">
          <div class="accodion-item-slot">
            <p>Danielle Ezra | Coordinator</p>
            <p>Tel: +972-3-5555555</p>
            <p>Mob: +972-50-5555555</p>
            <p>E-mail: user@toy-store.org.il</p>
          </div>
        </accordion-item>
      </transition>
    </div>

    <div class="accodion-item">
      <p @click="setActive('marketing')">Marketing</p>
      <transition name="fade">
        <accordion-item v-if="active === 'marketing'">
          <div class="accodion-item-slot">
            <p>Danielle Ezra | Marketing</p>
            <p>Tel: +972-3-5555555</p>
            <p>Mob: +972-50-5555555</p>
            <p>E-mail: user@toy-store.org.il</p>
          </div>
        </accordion-item>
      </transition>
    </div>
  </div>
</template>

<script>
import accordionItem from "@/cmps/accordion-item.cmp.vue";

export default {
  data() {
    return {
      active: ""
    };
  },
  methods: {
    setActive(value) {
      if (this.active === value) this.active = "";
      else this.active = value;
    }
  },
  components: {
    accordionItem
  }
};
</script>