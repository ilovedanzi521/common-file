import Vue from "vue";
import { Component } from "vue-property-decorator";
/**Win插件开始 */
import {
    WinButton,
    WinForm,
    WinFormItem,
    WinInput,
    WinMenu,
    WinMenuItem,
    WinSubmenu,
    WinPagination,
    WinSelect,
    WinOption,
    WinSwitch,
    WinTable,
    WinTableColumn,
    WinTabs,
    WinTabPane,
    WinRow,
    WinCol,
    WinDatePicker,
    WinCheckbox,
    WinTree,
    WinAutocomplete,
    WinDivider,
    WinSelectTable,
    WinButtonGroup
} from "win-plus";

//新增抽出来的业务组件

//新增抽出来的业务组件

/**Win插件结束 */

import PageVO from "../vo/PageVO";
@Component({
    components: {
        WinButton,
        WinDatePicker,
        WinForm,
        WinFormItem,
        WinInput,
        WinMenu,
        WinMenuItem,
        WinSubmenu,
        WinPagination,
        WinSelect,
        WinOption,
        WinSwitch,
        WinTable,
        WinTableColumn,
        WinTabs,
        WinTabPane,
        WinRow,
        WinCol,
        WinCheckbox,
        WinTree,
        WinAutocomplete,
        WinDivider,
        WinSelectTable,
        WinButtonGroup
    }
})
export default class BaseController extends Vue {
    pageVO: PageVO = new PageVO();

    /**对象复制 */
    copy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
}
