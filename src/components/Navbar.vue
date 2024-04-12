<template>
  <div class="spacer"></div>
  <v-navigation-drawer
      class="border-radius position-fixed overflow-x-hidden"
      permanent :width="321" floating
  >

    <v-container>


      <v-row>


        <v-col align="center" justify="center" class="pt-14">
          <v-img v-once :src="crocoLogo" width="86" height="47" :transition="false" cover></v-img>

          <v-list-item class="pt-7">
            <v-btn class="no-uppercase" flat elevation="0" color="primary" :prepend-icon="IconRightArrowLong"
                   rounded>
                  <span class="crocoBtnText">
                    crocobet.com
                  </span>
            </v-btn>
          </v-list-item>
        </v-col>


      </v-row>


    </v-container>

    <v-list v-for="navLink in navLinks" :key="navLink.id" class="py-0" density="compact">
      <router-link :to="{name: navLink.name}">
        <v-list-item link height="64" class="pr-14 " :class="isCurrentRoute(navLink) && 'bg-white'">
          <v-card v-if="isCurrentRoute(navLink)" color="primary" width="7" height="100%" rounded="0" class="activeGreenMark"></v-card>
          <div class="pl-5 d-flex font-weight-medium">
            <v-icon :icon="navLink.icon"/>
            <span class="pl-4">{{ navLink.title }}</span>
          </div>
        </v-list-item>
      </router-link>
      <v-divider></v-divider>
    </v-list>


  </v-navigation-drawer>
</template>

<script setup lang="ts">
import crocoLogo from "@/assets/logos/croco.png";
import IconRightArrowLong from "@/components/icons/IconRightArrowLong.vue";

import {headerMetaData} from "@/data/navLinks.ts";
import {useRoute} from "vue-router";
import {MetaData} from "@/types/navbar/index.interface.ts";

const route = useRoute();
const navLinks = headerMetaData();

const isCurrentRoute = (navLink: MetaData) => navLink.name === route.name;


</script>

<style scoped>
.spacer {
  min-width: 321px;
}

.border-radius {
  border-top-right-radius: 24px;
  -webkit-border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  -webkit-border-bottom-right-radius: 24px;
}

.crocoBtnText {
  height: 20px;
}

.no-uppercase {
  text-transform: unset !important;
}

.activeGreenMark {
  position: absolute;
  right: 0;
  top: 0;
}

</style>