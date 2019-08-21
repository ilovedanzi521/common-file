<template>
    <div class="ifram-content">
        <iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" :src="srcMenuAddress" ref="ifram">
        </iframe>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
    computed: {
        ...mapState({
            menuAddress: (state: any) => state.directional.menuAddress
        })
    },
    watch: {
        menuAddress: {
            handler(newValue, oldValue) {
                this.handleMenuAddress(newValue, oldValue);
            }
        }
    }
})
export default class Directional extends Vue {
    srcMenuAddress: string = "";

    handleMenuAddress(newValue, oldValue) {
        this.srcMenuAddress = newValue;
    }
    mounted() {
        let that = this;
        let iframe = this.$refs.ifram;
        iframe.onload = function() {
            iframe.contentDocument.onclick = function() {
                that.$emit("closeAll");
            };
        };
    }
}
</script>
<style lang="scss" scoped>
.ifram-content {
    position: absolute;
    top: 0;
    bottom: 22px;
    right: 0;
    left: 0;
    iframe {
        position: absolute;
        // top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
    }
}
</style>