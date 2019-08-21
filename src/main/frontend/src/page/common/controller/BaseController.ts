import Vue from "vue";
import { Component } from "vue-property-decorator";
/**Win插件开始 */
import {
    win_button,
    win_dialog,
    win_form,
    win_form_item,
    win_input,
    win_menu,
    win_menu_item,
    win_sub,
    win_pagination,
    win_select,
    win_option,
    win_switch,
    win_table,
    win_table_column,
    win_tabs,
    win_tab,
    win_row,
    win_col,
    win_message_success,
    win_message_warning,
    win_message_error,
    win_message_info,
    win_message_box_success,
    win_message_box_error,
    win_message_box_info,
    win_message_box_warning,
    win_date_picker,
    win_checkbox,
    win_tree,
    win_autocomplete
} from "@win-frond-frameworks/biz-common";
/**Win插件结束 */
import { DicRepVO } from "../../dictionary/vo/DicVO";
import PageVO from "../vo/PageVO";
@Component({
    components: {
        win_button,
        win_date_picker,
        win_dialog,
        win_form,
        win_form_item,
        win_input,
        win_menu,
        win_menu_item,
        win_sub,
        win_pagination,
        win_select,
        win_option,
        win_switch,
        win_table,
        win_table_column,
        win_tabs,
        win_tab,
        win_row,
        win_col,
        win_checkbox,
        win_tree,
        win_autocomplete
    }
})
export default class BaseController extends Vue {
    pageVO: PageVO = new PageVO();

    /**消息提示框方法声明开始 */
    win_message_success: any = win_message_success;
    win_message_warning: any = win_message_warning;
    win_message_error: any = win_message_error;
    win_message_info: any = win_message_info;
    //弹出框
    win_message_box_success: any = win_message_box_success;
    win_message_box_error: any = win_message_box_error;
    win_message_box_info: any = win_message_box_info;
    win_message_box_warning: any = win_message_box_warning;
    /**消息提示框方法声明结束 */

    /**提示信息,success */
    successMessage(info: string) {
        this.$message({
            showClose: true,
            type: "success",
            message: info
        });
    }

    /**提示信息,info */
    infoMessage(info: string) {
        this.$message({
            showClose: true,
            type: "info",
            message: info
        });
    }

    /**提示信息,error */
    errorMessage(info: string) {
        this.$message({
            showClose: true,
            type: "error",
            message: info
        });
    }

    /**提示信息,warning */
    warningMessage(info: string) {
        this.$message({
            showClose: true,
            type: "warning",
            message: info
        });
    }

    /**字典值,表格显示 */
    dicFormatter(cellValue: string, dics: DicRepVO[]) {
        for (var i = 0; i < dics.length; i++) {
            if (cellValue === dics[i].dicCode) {
                return dics[i].dicExplain;
            }
        }
        return "";
    }

    /**对象复制 */
    copy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
}
